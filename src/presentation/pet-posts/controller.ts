import { Request, Response } from 'express';
import { CreatorPetPostService } from './services/creator-pet-post-service';
import { FinderPetPostsService } from './services/finder-pet-posts-service';
import { FinderPetPostService } from './services/finder-pet-post-service';
import { UpdatePetPostService } from './services/update-pet-post-service';
import { CreatePostDto } from '../../domain';
import { UpdatePostDto } from '../../domain/dtos/post-pet/update-post-dto';
import { EliminatorPetPostService } from './services/eliminator-pet-post-service';

export class PetController {
	constructor(
		private readonly creatorPetPostService: CreatorPetPostService,
		private readonly finderPetPostsService: FinderPetPostsService,
		private readonly finderPetPostService: FinderPetPostService,
		private readonly updatePetPostService: UpdatePetPostService,
		private readonly eliminatorPetPostService: EliminatorPetPostService,
	) {}

	findAll = (req: Request, res: Response) => {
		this.finderPetPostsService
			.execute()
			.then((users) => res.status(200).json(users))
			.catch((err) => res.status(500).json({ message: err.message }));
	};

	register = (req: Request, res: Response) => {
		const userId = req.body.sessionUser.id;

		this.creatorPetPostService
			.execute(req.body, userId)
			.then((data) => res.status(201).json(data))
			.catch((err) => res.status(500).json({ message: err.message }));
	};

	findOne = (req: Request, res: Response) => {
		const { id } = req.params;
		this.finderPetPostService
			.execute(id)
			.then((userId) => res.status(200).json(userId))
			.catch((err) => res.status(404).json({ message: err.message }));
	};

	update = (req: Request, res: Response) => {
		const { id } = req.params;

		const [error, updatePostDto] = UpdatePostDto.execute(req.body);
		if (error) {
			return res.status(422).json({ message: error });
		}

		this.updatePetPostService
			.execute(id, updatePostDto!)
			.then((user) => res.status(200).json(user))
			.catch((err) => res.status(404).json({ message: err.message }));
	};

	approve = (req: Request, res: Response) => {
		const { id } = req.params;
		this.updatePetPostService
			.approve(id)
			.then((result) => res.status(200).json(result))
			.catch((err) => res.status(400).json({ message: err.message }));
	};

	reject = (req: Request, res: Response) => {
		const { id } = req.params;
		this.updatePetPostService
			.reject(id)
			.then((result) => res.status(200).json(result))
			.catch((err) => res.status(400).json({ message: err.message }));
	};

	delete = (req: Request, res: Response) => {
		const { id } = req.params;
		this.eliminatorPetPostService
			.execute(id)
			.then(() => res.status(204).json(null))
			.catch((err) => res.status(404).json({ message: err.message }));
	};
}
