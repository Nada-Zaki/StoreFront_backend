import { DashboardService } from '../../services/dashboard';
import { OrderStore } from '../../models/order';

const service = new DashboardService();
const orderStore = new OrderStore();

describe('Dashboard service tests', () => {
	beforeAll(async () => {
		await orderStore.create({
			user_id: '1',
			status: true
		});
		await orderStore.addProduct('3', '3', 2);
	});

	it('current user order method should return the active orders of a user', async () => {
		const result = await service.currentUserOrder('1');
		expect(result).toEqual([
			{
				order_id: '3',
				name: 'Blouse',
				quantity: 2,
				price: 15.99,
				category: null
			}
		]);
	});

	it('completed user orders method should return the completed orders of a user', async () => {
		const result = await service.completedUserOrder('1');
		expect(result).toEqual([]);
	});

	it('should return most 5 popular products', async () => {
		const result = await service.popularProducts();
		expect(result).toBeTruthy();
	});
});
