import { envs } from './config/env.config';
import { AppRoutes } from './routes/routes';
import { Server } from './config/server.config';


(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}