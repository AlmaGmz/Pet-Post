import { PetPost } from '../../../data/postgres/models/pet-post-model';

export class FinderPetPostsService {
	async execute() {
		try {
			return await PetPost.find({
				where: {
					hasFound: false,
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
		} catch (error) {
			throw new Error('An error ocurred while searching for users');
		}
	}
}
