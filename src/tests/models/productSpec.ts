import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model', () => {
	it('index method should return a list of one product', async () => {
		const result = await store.index();
		expect(result).toEqual([
			{
				id: 1,
				name: 'Pants',
				price: 30,
				category: 'men clothes'
			}
		]);
	});

	it('create method should add a product', async () => {
		const result = await store.create({
			name: 'Dress',
			price: 30,
			category: 'Dresses'
		});
		expect(result).toEqual({
			id: 2,
			name: 'Dress',
			price: 30,
			category: 'Dresses'
		});
	});

	it('update method should edit a product', async () => {
		const result = await store.update({
			id: 2,
			name: 'Dress',
			price: 30,
			category: 'Dresses'
		});
		expect(result).toEqual({
			id: 2,
			name: 'Dress',
			price: 30,
			category: 'Dresses'
		});
	});

	it('show method should return the correct product', async () => {
		const result = await store.show('2');
		expect(result).toEqual({
			id: 2,
			name: 'Dress',
			price: 30,
			category: 'Dresses'
		});
	});

	it('products by category method should return the correct products', async () => {
		const result = await store.productsByCategory('men clothes');
		expect(result).toEqual([
			{
				id: 1,
				name: 'Pants',
				price: 30,
				category: 'men clothes'
			}
		]);
	});

	it('delete method should remove the product by id', async () => {
		const result = await store.delete('2');
		expect(result).toEqual({
			id: 2,
			name: 'Dress',
			price: 30,
			category: 'Dresses'
		});
	});
});
