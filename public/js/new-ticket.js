const currentTicketLbl = document.getElementById("currentTicketLbl");
const createTicketBtn = document.getElementById("createTicketBtn");

const getLastTicket = async () => {
  const lastTicket = await fetch("/api/ticket/last").then((resp) =>
    resp.json()
  );
  currentTicketLbl.innerText = lastTicket;
};

const createTicket = async () => {
  const newTicket = await fetch("/api/ticket", {
    method: "POST",
  }).then((resp) => resp.json());

  currentTicketLbl.innerText = newTicket.number;
};

createTicketBtn.onclick = createTicket;

getLastTicket();
