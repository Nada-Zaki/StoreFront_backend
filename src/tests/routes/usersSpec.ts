import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const request = supertest(app);
dotenv.config();
const secret = process.env.TOKEN_SECRET as string;

describe('Tests for users end points', () => {
	describe('Tests for users index route', async () => {
		it('should return status code 401 because of not sending token', async () => {
			const response = await request.get('/users');
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
				.get('/users')
				.set('Authorization', `Bearer ${token}`);
			expect(response.status).toBe(200);
		});
	});
	describe('Tests for users create route', async () => {
		it('should return status code 400 because of not sending last name', async () => {
			const response = await request.post('/users').send({
				first_name: 'Zaki',
				password: '123'
			});
			expect(response.status).toBe(400);
		});

		it('should return status code 200 to be ok', async () => {
			const response = await request.post('/users').send({
				firstName: 'Zaki',
				lastName: 'Saleh',
				password: '123'
			});
			expect(response.status).toBe(200);
		});
	});
	describe('Tests for users authenticate route', async () => {
		it('should return status code 200 because the credentials are correct', async () => {
			const response = await request.post('/users/signin').send({
				firstName: 'Zaki',
				lastName: 'Saleh',
				password: '123'
			});
			expect(response.status).toBe(200);
		});

		it('should return status code 401 because password is wrong', async () => {
			const response = await request.post('/users/signin').send({
				firstName: 'Zaki',
				lastName: 'Saleh',
				password: 'anything'
			});
			expect(response.status).toBe(401);
		});
	});
	describe('Tests for users show route', async () => {
		it('should return status code 200 to be ok', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.get('/users/1')
				.set('Authorization', `Bearer ${token}`);
			expect(response.status).toBe(200);
		});
		it('should return status code 400 because the user does not exist', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '123'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.get('/users/5')
				.set('Authorization', `Bearer ${token}`);
			expect(response.status).toBe(400);
		});
	});
	describe('Tests for users update route', async () => {
		it('should return status code 401 because the token in header is different from the token of user data in body', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '12345'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.put('/users/4')
				.set('Authorization', `Bearer ${token}`)
				.send({
					id: 4,
					firstName: 'Mohamed',
					lastName: 'Mahmoud',
					password: '1234'
				});
			expect(response.status).toBe(401);
		});
	});
	describe('Tests for users delete route', async () => {
		it('should return status code 401 because the token in header is different from the token of user id in url', async () => {
			const user = {
				firstName: 'Nada',
				last_name: 'Zaki',
				password: '12345'
			};
			const token = jwt.sign(user, secret);
			const response = await request
				.delete('/users/1')
				.set('Authorization', `Bearer ${token}`);
			expect(response.status).toBe(401);
		});
	});
});
