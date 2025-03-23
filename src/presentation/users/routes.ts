import { Request, Response, Router } from 'express';
import { UserController } from './controller';
import { FinderUsersService } from './services/finder-users-service';
import { RegisterUserService } from './services/register-user-service';
import { FinderUserService } from './services/finder-user-service';
import { UpdateUserService } from './services/update-user-service';
import { EliminatorUserService } from './services/eliminator-user-service';
import { LoginUserService } from './services/login-user-service';
import { AuthMiddleware } from '../common/middlewares/auth-middleware';
import { UserRole } from '../../data/postgres/models/user-model';

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

		router.use(AuthMiddleware.protect);

		router.get(
			'/',
			AuthMiddleware.restrictTo(UserRole.ADMIN),
			controller.findAll,
		);

		router.get(
			'/:id',
			AuthMiddleware.restrictTo(UserRole.ADMIN),
			controller.findOne,
		);

		router.patch(
			'/:id',
			AuthMiddleware.restrictTo(UserRole.ADMIN),
			controller.update,
		);

		router.delete(
			'/:id',
			AuthMiddleware.restrictTo(UserRole.ADMIN),
			controller.delete,
		);

		return router;
	}
}
