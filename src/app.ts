import { createServer } from 'http';
import { envs } from './config/env.config';
import { AppRoutes } from './config/routes.config';
import { Server } from './config/server.config';
import { WssService } from './config/service/wss.service';


(async()=> {
  main();
})();


function main() {

  const server = new Server({
  });

  const httpServer = createServer(server.app);
  WssService.initWss({server: httpServer, path: '/ws'});

  server.setRoutes(AppRoutes.routes);
  httpServer.listen(envs.PORT, () => `Servidor corriendo en el puerto ${envs.PORT}`)
}