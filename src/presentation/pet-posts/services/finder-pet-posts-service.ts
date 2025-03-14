import { PetPost } from '../../../data/postgres/models/pet-post-model';

export class FinderPetPostsService {
	async execute() {
		try {
			return await PetPost.find({
				select: ['id', 'pet_name', 'status', 'owner', 'hasFound'],
				where: {
					hasFound: false,
				},
			});
		} catch (error) {
			throw new Error('An error ocurred while searching for users');
		}
	}
}
