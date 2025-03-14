import { User } from '../../../data/postgres/models/user-model';
import { CreateUserDto } from '../../../domain';

export class RegisterUserService {
	async execute(userData: CreateUserDto) {
		const user = new User();

		user.fullname = userData.fullname;
		user.email = userData.email;
		user.password = userData.password;
		user.phone_number = userData.phone_number;

		try {
			await user.save();
			return {
				message: 'User created successfuly',
			};
		} catch (error) {
			throw new Error('An error ocurred while registering the user');
		}
	}
}
