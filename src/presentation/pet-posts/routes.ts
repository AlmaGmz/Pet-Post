import { Request, Response, Router } from 'express';
import { PetController } from './controller';
import { CreatorPetPostService } from './services/creator-pet-post-service';
import { FinderPetPostsService } from './services/finder-pet-posts-service';
import { FinderPetPostService } from './services/finder-pet-post-service';
import { UpdatePetPostService } from './services/update-pet-post-service';
import { EliminatorPetPostService } from './services/eliminator-pet-post-service';

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

		router.get('/', controller.findAll);

		router.post('/register', controller.register);

		router.get('/:id', controller.findOne);

		router.patch('/:id', controller.update);

		router.patch('/:id/approve', controller.approve);

		router.patch('/:id/reject', controller.reject);

		router.delete('/:id', controller.delete);

		return router;
	}
}
