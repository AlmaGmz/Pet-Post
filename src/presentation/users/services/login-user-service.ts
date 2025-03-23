import { encriptAdapter, envs } from '../../../config';
import { JwtAdapter } from '../../../config/jwt-adapter';
import { User } from '../../../data/postgres/models/user-model';
import { LoginUserDto } from '../../../domain';

export class LoginUserService {
	async execute(credentials: LoginUserDto) {
		//1. Checar si el usuario existe
		const user = await this.ensureUserExist(credentials.email);

		//2. Checar si la contraseña es correcta
		this.ensurePasswordIsCorrect(credentials.password, user!.password);

		//3. Si todo es correcto se genera un token

		const token = await this.generateToken(
			{ id: user!.id },
			envs.JWT_EXPIRE_IN,
		);

		//4. Se retorna el token

		return {
			token,
			user: {
				id: user?.id,
				email: user?.email,
				phone: user?.phone_number,
				rol: user?.rol,
			},
		};
	}

	private async ensureUserExist(email: string) {
		const user = await User.findOne({
			where: {
				email: email,
				status: true,
			},
		});
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	}

	private ensurePasswordIsCorrect(
		unHashedPassword: string,
		hashedPassword: string,
	) {
		const isMatch = encriptAdapter.compare(unHashedPassword, hashedPassword);

		if (!isMatch) {
			throw new Error('Invalid Credentials');
		}
		return true;
	}

	private async generateToken(payload: any, duration: string) {
		const token = await JwtAdapter.generateToken(payload, duration);
		if (!token) throw new Error('Error while creating JWT');
		return token;
	}
}
