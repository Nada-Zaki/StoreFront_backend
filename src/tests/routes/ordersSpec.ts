import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const request = supertest(app);
dotenv.config();
const secret = process.env.TOKEN_SECRET as string;

describe('Tests for orders end points', () => {
	describe('Tests for orders index route', async () => {
		it('should return status code 200 to be ok', async () => {
			const response = await request.get('/orders');
			expect(response.status).toBe(200);
		});
	});
	describe('Tests for orders create route', async () => {
		it('should return status code 401 because of not sending token', async () => {
			const response = await request.post('/orders').send({
				userId: '1',
				status: 'active'
			});
			expect(response.status).toBe(401);
		});

		it('should return status code 200 to be ok', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.post('/orders')
				.set('Authorization', `Bearer ${token}`)
				.send({
					userId: '1',
					status: 'active'
				});
			expect(response.status).toBe(200);
		});
	});
	describe('Tests for add products in orders route', async () => {
		it('should return status code 401 because of not sending token', async () => {
			const response = await request.post('/orders/2/products').send({
				orderId: '2',
				productId: '1',
				quantity: 2
			});
			expect(response.status).toBe(401);
		});

		it('should return status code 200 to be ok', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.post('/orders/2/products')
				.set('Authorization', `Bearer ${token}`)
				.send({
					orderId: '2',
					productId: '1',
					quantity: 2
				});
			expect(response.status).toBe(200);
		});
	});
	describe('Tests for orders show route', async () => {
		it('should return status code 200 to be ok', async () => {
			const response = await request.get('/orders/2');
			expect(response.status).toBe(200);
		});
		it('should return status code 400 because the order does not exist', async () => {
			const response = await request.get('/orders/9');
			expect(response.status).toBe(400);
		});
	});

	describe('Tests for orders update route', async () => {
		it('should return status code 200', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.put('/orders/2')
				.set('Authorization', `Bearer ${token}`)
				.send({
					userID: '1',
					status: 'complete'
				});
			expect(response.status).toBe(200);
		});
	});

	describe('Tests for orders delete route', async () => {
		it('should return status code 200 to be ok', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.delete('/orders/2')
				.set('Authorization', `Bearer ${token}`);
			expect(response.status).toBe(200);
		});
	});
});
