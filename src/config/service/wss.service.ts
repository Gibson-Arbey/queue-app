import { Server } from 'http';
import { WebSocket, WebSocketServer} from 'ws';

interface Options {
  server: Server;
  path?: string; // ws
}

export class WssService {
  private static _instance: WssService;
  private wss: WebSocketServer;

  private constructor( options: Options ) {
    const { server, path = '/ws' } = options; /// ws://localhost:3000/ws

    this.wss = new WebSocketServer({ server, path });
    this.start();
  }

  static initWss( options: Options ) {
    WssService._instance = new WssService(options);
  }

  static get instace(): WssService {
    if( !WssService._instance) {
      throw new Error('El WebService no esta instanciado') ;
    }
    return WssService._instance;
  }

  public start() {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log("Cliente conectado");

      ws.on('close', () => console.log("Cliente desconectado"));
    });
  }
}
