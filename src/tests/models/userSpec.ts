import { UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model', () => {
	it('index method should return a list of one user', async () => {
		const result = await store.index();
		expect(result.length).toEqual(1);
	});

	it('create method should add a user', async () => {
		const result = await store.create({
			firstName: 'Mohamed',
			lastName: 'Ahmed',
			password: '123'
		});
		expect(result).toBeTruthy();
	});

	it('update method should edit a user', async () => {
		const result = await store.update({
			id: 1,
			firstName: 'Nada',
			lastName: 'Zaki',
			password: '123'
		});
		expect(result).toBeDefined();
	});

	it('show method should return the correct user', async () => {
		const result = await store.show('2');
		expect(result).toBeTruthy();
	});

	it('authenticate method should return null if password is not correct', async () => {
		const result = await store.authenticate({
			firstName: 'Nada',
			lastName: 'Zaki',
			password: 'anything'
		});
		expect(result).toBeNull();
	});

	it('delete method should remove the user by id', async () => {
		const result = await store.delete('2');
		expect(result).toBeDefined();
	});
});
