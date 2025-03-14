import { Request, Response, Router } from 'express';
import { UserController } from './controller';
import { FinderUsersService } from './services/finder-users-service';
import { RegisterUserService } from './services/register-user-service';
import { FinderUserService } from './services/finder-user-service';
import { UpdateUserService } from './services/update-user-service';
import { EliminatorUserService } from './services/eliminator-user-service';
import { LoginUserService } from './services/login-user-service';

export class UserRoutes {
	static get routes(): Router {
		const router = Router();

		const registerUserService = new RegisterUserService();
		const finderUsersService = new FinderUsersService();
		const finderUserService = new FinderUserService();
		const updateUserService = new UpdateUserService();
		const eliminatorUserService = new EliminatorUserService();
		const loginUserService = new LoginUserService();

		const controller = new UserController(
			registerUserService,
			finderUsersService,
			finderUserService,
			updateUserService,
			eliminatorUserService,
			loginUserService,
		);

		router.post('/register', controller.register);

		router.post('/login', controller.login);

		router.get('/', controller.findAll);

		router.get('/:id', controller.findOne);

		router.patch('/:id', controller.update);

		router.delete('/:id', controller.delete);

		return router;
	}
}
