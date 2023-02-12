import { Request, Response, Router } from 'express';
import productsRoutes from './products';
import usersRoutes from './users';
import ordersRoutes from './orders';
import dashboardRoutes from './dashboard';

const routes = Router();

routes.get('/', (_req: Request, res: Response) => {
	res.json('server working!');
});

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/dashboard', dashboardRoutes);

export default routes;
