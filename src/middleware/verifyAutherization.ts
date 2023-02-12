import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user';

dotenv.config();
const secret = process.env.TOKEN_SECRET as string;

const verifyAutherization = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		const authHeader = req.headers.authorization as string;
		const token = authHeader.split(' ')[1];
		const userId = +req.params.id;
		const decoded = jwt.verify(token, secret) as User;
		if (decoded.id !== userId) {
			throw new Error('User id does not match!');
		}
		next();
	} catch (err) {
		res.status(401).json((err as Error).message);
	}
};

export default verifyAutherization;
