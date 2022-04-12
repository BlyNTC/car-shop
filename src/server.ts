import carsRoute from './routers/carsRoutes';
import App from './app';

const server = new App();

server.addRouter(carsRoute);

export default server;
