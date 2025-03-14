import { User } from '../../../data/postgres/models/user-model';
import { UpdateUserDto } from '../../../domain';

export class UpdateUserService {
	async execute(userId: string, userData: UpdateUserDto) {
		const user = await this.ensureUserExits(userId);

		user.fullname = userData.fullname;
		user.email = userData.email;

		try {
			await user.save();
			return {
				message: 'User update successfuly',
			};
		} catch (error) {
			throw new Error('An error ocurred wile updating the user');
		}
	}

	private async ensureUserExits(userId: string): Promise<User> {
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
