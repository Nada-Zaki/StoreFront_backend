import { Request, Response, Router } from 'express';
import { OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/verifyAuthToken';

const ordersRoutes = Router();
const store = new OrderStore();

ordersRoutes.get('/', async (_req: Request, res: Response) => {
	try {
		const orders = await store.index();
		res.json(orders);
	} catch (err) {
		res.status(400).json((err as Error).message);
	}
});

ordersRoutes.get('/:id', async (req: Request, res: Response) => {
	try {
		const order = await store.show(req.params.id);
		res.json(order);
	} catch (err) {
		res.status(400).json((err as Error).message);
	}
});

ordersRoutes.post('/', verifyAuthToken, async (req: Request, res: Response) => {
	try {
		let status = true;
		if (req.body.status === 'complete') {
			status = false;
		}
		const result = await store.create({
			user_id: req.body.userId,
			status
		});
		res.json(result);
	} catch (err) {
		res.status(400).json((err as Error).message);
	}
});

ordersRoutes.post(
	'/:id/products',
	verifyAuthToken,
	async (req: Request, res: Response) => {
		try {
			const result = await store.addProduct(
				req.params.id,
				req.body.productId,
				+req.body.quantity
			);
			res.json(result);
		} catch (err) {
			res.status(400).json((err as Error).message);
		}
	}
);

ordersRoutes.put(
	'/:id',
	verifyAuthToken,
	async (req: Request, res: Response) => {
		try {
			let status = true;
			if (req.body.status === 'complete') {
				status = false;
			}
			const result = await store.update({
				id: +req.params.id,
				user_id: req.body.userId,
				status
			});
			res.json(result);
		} catch (err) {
			res.status(400).json((err as Error).message);
		}
	}
);

ordersRoutes.delete(
	'/:id',
	verifyAuthToken,
	async (req: Request, res: Response) => {
		const id = req.params.id;
		try {
			await store.delete(id);
			res.status(200).json('deleted');
		} catch (err) {
			res.status(400).json((err as Error).message);
		}
	}
);

export default ordersRoutes;
