import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

it('should return status code 200 to be ok', async () => {
	const response = await request.get('/');
	expect(response.status).toBe(200);
});
