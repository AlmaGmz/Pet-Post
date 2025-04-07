import {
	PetPost,
	PetPostStatus,
} from '../../../data/postgres/models/pet-post-model';

export class FinderPetPostService {
	async execute(userId: string) {
		const petPost = await PetPost.findOne({
			where: {
				status: PetPostStatus.APPROVED,
			},

			relations: {
				user: true,
			},
			select: {
				user: {
					id: true,
					fullname: true,
					email: true,
				},
			},
		});

		if (!petPost) {
			throw new Error(`Pet Post with id: ${userId} not found`);
		}
		console.log(petPost);
		return petPost;
	}
}
