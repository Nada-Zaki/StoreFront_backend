import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const request = supertest(app);
dotenv.config();
const secret = process.env.TOKEN_SECRET as string;

describe('Tests for products end points', () => {
	describe('Tests for products index route', async () => {
		it('should return status code 200 to be ok', async () => {
			const response = await request.get('/products');
			expect(response.status).toBe(200);
		});
		it('should return array of products in body', async () => {
			const response = await request.get('/products');
			expect(response.body).toEqual([
				{
					id: 1,
					name: 'Pants',
					price: 30,
					category: 'men clothes'
				}
			]);
		});
	});
	describe('Tests for products create route', async () => {
		it('should return status code 401 because of not sending token', async () => {
			const response = await request.post('/products').send({
				name: 'Blouse',
				price: '15.99',
				category: 'women'
			});
			expect(response.status).toBe(401);
		});

		it('should return status code 200 to be ok even if not assigning category', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.post('/products')
				.set('Authorization', `Bearer ${token}`)
				.send({
					name: 'Blouse',
					price: '15.99'
				});
			expect(response.status).toBe(200);
		});
	});
	describe('Tests for products show route', async () => {
		it('should return status code 200 to be ok', async () => {
			const response = await request.get('/products/1');
			expect(response.status).toBe(200);
		});
		it('should return status code 400 because the product does not exist', async () => {
			const response = await request.get('/products/9');
			expect(response.status).toBe(400);
		});
	});
	describe('Tests for products by category route', async () => {
		it('should return array of products in body', async () => {
			const response = await request.get('/products/category/men clothes');
			expect(response.body).toEqual([
				{
					id: 1,
					name: 'Pants',
					price: 30,
					category: 'men clothes'
				}
			]);
		});
	});
	describe('Tests for products update route', async () => {
		it('should return status code 200', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.put('/products/1')
				.set('Authorization', `Bearer ${token}`)
				.send({
					name: 'Pants',
					price: '30',
					category: 'men clothes'
				});
			expect(response.status).toBe(200);
		});
		it('should return status code 400 as the price not assigned', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.put('/products/1')
				.set('Authorization', `Bearer ${token}`)
				.send({
					id: 1,
					name: 'Blouse',
					category: 'women clothes'
				});
			expect(response.status).toBe(400);
		});
	});
	describe('Tests for products delete route', async () => {
		it('should return status code 401 because of not sending token', async () => {
			const response = await request.delete('/products/1');
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
				.delete('/products/1')
				.set('Authorization', `Bearer ${token}`);
			expect(response.status).toBe(200);
		});
	});
});
