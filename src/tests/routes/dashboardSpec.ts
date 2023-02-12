import supertest from 'supertest';
import app from '../../server';
import { OrderStore } from '../../models/order';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const request = supertest(app);
const orderStore = new OrderStore();

dotenv.config();
const secret = process.env.TOKEN_SECRET as string;

describe('Dashboard routes tests', () => {
	describe('Tests for current orders by user route', async () => {
		beforeAll(async () => {
			await orderStore.create({
				user_id: '1',
				status: true
			});
			await orderStore.addProduct('2', '1', 2);
		});

		it('should return status code 200', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.post('/dashboard/active-orders')
				.set('Authorization', `Bearer ${token}`)
				.send({
					userId: '1'
				});
			expect(response.status).toBe(200);
		});
		it('should return array of orders in body', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.post('/dashboard/active-orders')
				.set('Authorization', `Bearer ${token}`)
				.send({
					userId: '1'
				});
			expect(response.body).toEqual([
				{
					order_id: '2',
					name: 'Pants',
					price: 30,
					quantity: 2,
					category: 'men clothes'
				}
			]);
		});
	});

	describe('Tests for completed orders by user route', async () => {
		it('should return status code 200', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.post('/dashboard/completed-orders')
				.set('Authorization', `Bearer ${token}`)
				.send({
					userId: '1'
				});
			expect(response.status).toBe(200);
		});

		it('should return empty array in body', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.post('/dashboard/completed-orders')
				.set('Authorization', `Bearer ${token}`)
				.send({
					userId: '1'
				});
			expect(response.body).toEqual([]);
		});
	});

	describe('Most 5 popular products routes tests', () => {
		it('should return status code 200', async () => {
			const response = await request.get('/dashboard/popular-products');
			expect(response.status).toBe(200);
		});
	});
});
