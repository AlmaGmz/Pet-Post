import { Request, Response } from 'express';
import { RegisterUserService } from './services/register-user-service';
import { FinderUsersService } from './services/finder-users-service';
import { FinderUserService } from './services/finder-user-service';
import { UpdateUserService } from './services/update-user-service';
import { EliminatorUserService } from './services/eliminator-user-service';
import { LoginUserService } from './services/login-user-service';
import { CreateUserDto, UpdateUserDto } from '../../domain';

export class UserController {
	constructor(
		private readonly registerUserService: RegisterUserService,
		private readonly finderUsersService: FinderUsersService,
		private readonly finderUserService: FinderUserService,
		private readonly updateUserService: UpdateUserService,
		private readonly eliminatorUserService: EliminatorUserService,
		private readonly loginUserService: LoginUserService,
	) {}

	findAll = (req: Request, res: Response) => {
		this.finderUsersService
			.execute()
			.then((users) => res.status(200).json(users))
			.catch((err) => res.status(500).json({ message: err.message }));
	};

	register = (req: Request, res: Response) => {
		const [error, createUserDto] = CreateUserDto.execute(req.body);

		if (error) {
			return res.status(422).json({ message: error });
		}

		this.registerUserService
			.execute(createUserDto!)
			.then((message) => res.status(201).json(message))
			.catch((err) => res.status(500).json({ message: err.message }));
	};

	findOne = (req: Request, res: Response) => {
		const { id } = req.params;
		this.finderUserService
			.execute(id)
			.then((user) => res.status(200).json(user))
			.catch((err) => res.status(404).json({ message: err.message }));
	};

	update = (req: Request, res: Response) => {
		const { id } = req.params;

		const [error, updateUserDto] = UpdateUserDto.execute(req.body);

		if (error) {
			return res.status(422).json({ message: error });
		}

		this.updateUserService
			.execute(id, updateUserDto!)
			.then((user) => res.status(200).json(user))
			.catch((err) => res.status(500).json({ message: err.message }));
	};

	delete = (req: Request, res: Response) => {
		const { id } = req.params;
		this.eliminatorUserService
			.execute(id)
			.then(() => res.status(204).json(null))
			.catch((err) => res.status(404).json({ message: err.message }));
	};

	login = (req: Request, res: Response) => {
		const { email, password } = req.body;
		this.loginUserService.execute(email, password, res);
	};
}
