import { Response } from 'express';

export class LoginUserService {
	async execute(email: string, password: string, res: Response) {
		return res.status(501).json({ message: 'No yet implemented' });
	}
}
