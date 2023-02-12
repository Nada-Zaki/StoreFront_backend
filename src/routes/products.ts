import { Request, Response, Router } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/verifyAuthToken';

const productsRoutes = Router();
const store = new ProductStore();

productsRoutes.get('/', async (_req: Request, res: Response) => {
	try {
		const products = await store.index();
		res.json(products);
	} catch (err) {
		res.status(400).json((err as Error).message);
	}
});

productsRoutes.get('/:id', async (req: Request, res: Response) => {
	try {
		const product = await store.show(req.params.id);
		res.json(product);
	} catch (err) {
		res.status(400).json((err as Error).message);
	}
});

productsRoutes.post(
	'/',
	verifyAuthToken,
	async (req: Request, res: Response) => {
		try {
			const product: Product = req.body;
			const newProduct = await store.create(product);
			res.json(newProduct);
		} catch (err) {
			res.status(400).json((err as Error).message);
		}
	}
);

productsRoutes.put(
	'/:id',
	verifyAuthToken,
	async (req: Request, res: Response) => {
		try {
			const product: Product = {
				id: +req.params.id,
				...req.body
			};
			const newProduct = await store.update(product);
			res.json(newProduct);
		} catch (err) {
			res.status(400).json((err as Error).message);
		}
	}
);

productsRoutes.delete(
	'/:id',
	verifyAuthToken,
	async (req: Request, res: Response) => {
		const id = req.params.id;
		try {
			await store.delete(id);
			res.status(200).json('deleted');
		} catch (err) {
			res.json(err);
		}
	}
);

productsRoutes.get(
	'/category/:category',
	async (req: Request, res: Response) => {
		try {
			const products = await store.productsByCategory(req.params.category);
			res.json(products);
		} catch (err) {
			res.status(400).json((err as Error).message);
		}
	}
);

export default productsRoutes;
