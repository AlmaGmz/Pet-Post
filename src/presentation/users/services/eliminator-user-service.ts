import { User } from '../../../data/postgres/models/user-model';

export class EliminatorUserService {
	async execute(userId: string) {
		const user = await this.ensureUserExits(userId);

		user.status = false;

		try {
			await user.save();
		} catch (error) {
			throw new Error('An error ocurred while deleting the user');
		}
	}

	private async ensureUserExits(userId: string) {
		const user = await User.findOne({
			select: ['id'],
			where: {
				id: userId,
				status: true,
			},
		});
		if (!user) {
			throw new Error(`User with id: ${userId} not found`);
		}
		return user;
	}
}
