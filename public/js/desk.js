const lblPending = document.getElementById("lbl-pending");
const deskTitle = document.getElementById("deskTitle");
const noMoreTickets = document.getElementById("noMoreTickets");
const btnDraw = document.getElementById("btnDraw");
const btnDone = document.getElementById("btnDone");
const lblCurrentTicket = document.getElementById("lblCurrentTicket");

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es requerido");
}
const deskNumber = searchParams.get("escritorio");
let workingTicket = null;

deskTitle.innerText = deskNumber;

const checkTicketCount = (currentCount = 0) => {
  if (currentCount === 0) {
    noMoreTickets.classList.remove("d-none");
    lblPending.innerHTML = "";
  } else {
    noMoreTickets.classList.add("d-none");
    lblPending.innerHTML = currentCount;
  }
}

const loadInitialCount = async () => {
  const pendingTickets = await fetch("/api/ticket/pending").then((resp) =>
    resp.json()
  );
  checkTicketCount(pendingTickets.length);
}

const getTicket = async () => {
  await finishTicket();

  const { status, ticket, message } = await fetch(
    `/api/ticket/draw/${deskNumber}`
  ).then((resp) => resp.json());

  if (status === "error") {
    lblCurrentTicket.innerText = message;
    return;
  }

  workingTicket = ticket;
  lblCurrentTicket.innerText = ticket.number;
}

const finishTicket = async () => {
  if (!workingTicket) return;

  const { status, message } = await fetch(
    `/api/ticket/done/${workingTicket.id}`,
    {
      method: "PUT",
    }
  ).then((resp) => resp.json());

  console.log({ status, message });

  if (status === "ok") {
    workingTicket = null;
    lblCurrentTicket.innerText = "Nadie";
  }
}

const connectToWebSockets = () => {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data);
    if (type !== "on-ticket-count-changed") return;
    checkTicketCount(payload);
  };

  socket.onclose = (event) => {
    console.log("Conexion cerrada");
    setTimeout(() => {
      console.log("Intentando reconectar");
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log("Conectado");
  };
};

btnDraw.onclick = getTicket;
btnDone.onclick = finishTicket;

loadInitialCount();
connectToWebSockets();
