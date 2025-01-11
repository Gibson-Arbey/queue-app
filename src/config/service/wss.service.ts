import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

interface Options {
  server: Server;
  path : string;
}

export class WssService {
  private static _instance: WssService;
  private readonly wss: WebSocketServer;

  private constructor(options: Options) {
    this.wss = new WebSocketServer(options);
    this.start();
  }

  static initWss(options: Options) {
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
