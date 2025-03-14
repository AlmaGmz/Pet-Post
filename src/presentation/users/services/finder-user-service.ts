import { User } from '../../../data/postgres/models/user-model';

export class FinderUserService {
	async execute(userId: string) {
		const user = await User.findOne({
			select: ['id', 'fullname', 'email', 'phone_number', 'rol'],
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
