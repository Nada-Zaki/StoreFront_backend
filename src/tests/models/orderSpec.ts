import { OrderStore } from '../../models/order';
import { UserStore } from '../../models/user';
import { ProductStore } from '../../models/product';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Order Model', () => {
	beforeAll(async () => {
		await userStore.create({
			firstName: 'Nada',
			lastName: 'Zaki',
			password: '1234'
		});
		await productStore.create({
			name: 'Pants',
			price: 30,
			category: 'men clothes'
		});
	});
	it('index method should return an empty list of orders', async () => {
		const result = await store.index();
		expect(result).toEqual([]);
	});

	it('create method should add an order', async () => {
		const result = await store.create({
			user_id: '1',
			status: true
		});
		expect(result).toEqual({
			id: 1,
			user_id: '1',
			status: true
		});
	});

	it('update method should edit an order', async () => {
		const result = await store.update({
			id: 1,
			user_id: '1',
			status: true
		});
		expect(result).toEqual({
			id: 1,
			user_id: '1',
			status: true
		});
	});

	it('show method should return the correct order', async () => {
		const result = await store.show('1');
		expect(result).toEqual({
			id: 1,
			user_id: '1',
			status: true
		});
	});

	it('create method should add a product in order', async () => {
		const result = await store.addProduct('1', '1', 4);
		expect(result).toBeTruthy();
	});

	it('delete method should remove the order by id', async () => {
		const result = await store.delete('1');
		expect(result).toEqual({
			id: 1,
			user_id: '1',
			status: true
		});
	});
});
