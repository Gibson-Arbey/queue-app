import express, { Router, Application } from 'express';
import path from 'path';

interface Options {
  public_path?: string;
}

export class Server {
  public readonly app: Application = express(); // Express application
  private readonly publicPath: string;

  constructor(options: Options) {
    const { public_path = 'public' } = options;
    this.publicPath = public_path;

    this.configure(); // Configura middlewares y rutas
  }

  private configure() {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* SPA Fallback (Debe ir después de las rutas de la API)
    this.app.get(/^\/(?!api).*/, (req, res) => {
      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });
  }

  public setRoutes(  router: Router ) {
    this.app.use(router);
  }
}
