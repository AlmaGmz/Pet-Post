import { User } from '../../../data/postgres/models/user-model';

export class FinderUsersService {
	async execute() {
		try {
			return await User.find({
				select: ['id', 'fullname', 'email', 'phone_number', 'rol'],
				where: {
					status: true,
				},
			});
		} catch (error) {
			throw new Error('An error ocurred while searching for users');
		}
	}
}
