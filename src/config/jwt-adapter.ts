import jwt from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {
	static async generateToken(payload: any, duration: string = '5h') {
		return new Promise((resolve) => {
			jwt.sign(payload, envs.JWT_KEY, { expiresIn: duration }, (err, token) => {
				if (err) return resolve(null);

				resolve(token);
			});
		});
	}

	static async validateToken(token: string) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, envs.JWT_KEY, (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});
	}
}
