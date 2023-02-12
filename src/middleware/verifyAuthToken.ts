import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secret = process.env.TOKEN_SECRET as string;

const verifyAuthToken = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		const authHeader = req.headers.authorization as string;
		const token = authHeader.split(' ')[1];
		jwt.verify(token, secret);
		next();
	} catch (err) {
		res.status(401).json('Access denied, invalid token.');
		return;
	}
};

export default verifyAuthToken;
