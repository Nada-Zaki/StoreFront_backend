import { Request, Response, Router } from 'express';
import { DashboardService } from '../services/dashboard';

const dashboardRoutes = Router();
const service = new DashboardService();

dashboardRoutes.get(
	'/popular-products',
	async (_req: Request, res: Response) => {
		try {
			const products = await service.popularProducts();
			res.json(products);
		} catch (err) {
			res.status(400).json((err as Error).message);
		}
	}
);

dashboardRoutes.post('/active-orders', async (req: Request, res: Response) => {
	try {
		const currentOrders = await service.currentUserOrder(req.body.userId);
		res.json(currentOrders);
	} catch (err) {
		res.status(400).json((err as Error).message);
	}
});

dashboardRoutes.post(
	'/completed-orders',
	async (req: Request, res: Response) => {
		try {
			const completedOrders = await service.completedUserOrder(req.body.userId);
			res.json(completedOrders);
		} catch (err) {
			res.status(400).json((err as Error).message);
		}
	}
);

export default dashboardRoutes;
