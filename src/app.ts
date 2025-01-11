import { createServer } from 'http';
import { envs } from './config/env.config';
import { AppRoutes } from './routes/routes';
import { Server } from './config/server.config';
import { WssService } from './config/service/wss.service';


(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  const httpServer = createServer(server.app);
  WssService.initWss({server: httpServer, path:'/ws'});

  httpServer.listen(envs.PORT, () => `Servidor corriendo en el puerto ${envs.PORT}`);
}