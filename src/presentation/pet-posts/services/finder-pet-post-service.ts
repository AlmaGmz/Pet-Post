import { PetPost } from '../../../data/postgres/models/pet-post-model';

export class FinderPetPostService {
	async execute(userId: string) {
		const petPost = await PetPost.findOne({
			select: ['id', 'pet_name', 'status', 'owner', 'hasFound'],
			where: {
				id: userId,
			},
		});

		if (!petPost) {
			throw new Error(`Pet Post with id: ${userId} not found`);
		}
		return petPost;
	}
}
