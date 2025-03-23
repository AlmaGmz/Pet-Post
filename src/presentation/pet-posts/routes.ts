import { Request, Response, Router } from 'express';
import { PetController } from './controller';
import { CreatorPetPostService } from './services/creator-pet-post-service';
import { FinderPetPostsService } from './services/finder-pet-posts-service';
import { FinderPetPostService } from './services/finder-pet-post-service';
import { UpdatePetPostService } from './services/update-pet-post-service';
import { EliminatorPetPostService } from './services/eliminator-pet-post-service';
import { AuthMiddleware } from '../common/middlewares/auth-middleware';
import { UserRole } from '../../data/postgres/models/user-model';

export class PetRoutes {
	static get routes(): Router {
		const router = Router();

		const creatorPetPostService = new CreatorPetPostService();
		const finderPetPostsService = new FinderPetPostsService();
		const finderPetPostService = new FinderPetPostService();
		const updatePetPostService = new UpdatePetPostService();
		const eliminatorPetPostService = new EliminatorPetPostService();

		const controller = new PetController(
			creatorPetPostService,
			finderPetPostsService,
			finderPetPostService,
			updatePetPostService,
			eliminatorPetPostService,
		);

		router.post('/register', controller.register);

		router.use(AuthMiddleware.protect);

		router.get('/', controller.findAll);

		router.get('/:id', controller.findOne);

		router.patch(
			'/:id',
			AuthMiddleware.restrictTo(UserRole.ADMIN),
			controller.update,
		);

		router.patch(
			'/:id/approve',
			AuthMiddleware.restrictTo(UserRole.ADMIN),

			controller.approve,
		);

		router.patch(
			'/:id/reject',
			AuthMiddleware.restrictTo(UserRole.ADMIN),

			controller.reject,
		);

		router.delete(
			'/:id',
			AuthMiddleware.restrictTo(UserRole.ADMIN),
			controller.delete,
		);

		return router;
	}
}
