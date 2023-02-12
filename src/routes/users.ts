import { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/verifyAuthToken';
import verifyAutherization from '../middleware/verifyAutherization';

const usersRoutes = Router();
const store = new UserStore();
dotenv.config();
const secret = process.env.TOKEN_SECRET as string;

usersRoutes.get('/', verifyAuthToken, async (_req: Request, res: Response) => {
	try {
		const users = await store.index();
		res.json(users);
	} catch (err) {
		res.status(400).json((err as Error).message);
	}
});

usersRoutes.get(
	'/:id',
	verifyAuthToken,
	async (req: Request, res: Response) => {
		try {
			const user = await store.show(req.params.id);
			res.json(user);
		} catch (err) {
			res.status(400).json((err as Error).message);
		}
	}
);

usersRoutes.post('/', async (req: Request, res: Response) => {
	try {
		const user: User = req.body;
		const newUser = await store.create(user);
		const token = jwt.sign(newUser, secret);
		res.json(token);
	} catch (err) {
		res.status(400).json((err as Error).message);
	}
});

usersRoutes.post('/signin', async (req: Request, res: Response) => {
	try {
		const user = req.body;
		const result = (await store.authenticate(user)) as User;
		const token = jwt.sign(result, secret);
		res.json(token);
	} catch (err) {
		res.status(401).json((err as Error).message);
	}
});

usersRoutes.put(
	'/:id',
	verifyAutherization,
	async (req: Request, res: Response) => {
		try {
			const user: User = {
				id: +req.params.id,
				...req.body
			};
			const newProduct = await store.update(user);
			res.json(newProduct);
		} catch (err) {
			res.status(400).json((err as Error).message);
		}
	}
);

usersRoutes.delete(
	'/:id',
	verifyAutherization,
	async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			await store.delete(id);
			res.status(200).json('deleted');
		} catch (err) {
			res.json((err as Error).message);
		}
	}
);

export default usersRoutes;
