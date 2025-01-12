import express, { Router, Application } from 'express';
import path from 'path';

interface Options {
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app: Application = express(); // Express application
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { routes, public_path = 'public' } = options;
    this.publicPath = public_path;
    this.routes = routes;

    this.configure(); // Configura middlewares y rutas
  }

  private configure() {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //* Routes
    this.app.use(this.routes);

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* SPA Fallback (Debe ir después de las rutas de la API)
    this.app.get(/^\/(?!api).*/, (req, res) => {
      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });
  }
}
