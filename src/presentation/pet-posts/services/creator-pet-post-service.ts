import { PetPost } from '../../../data/postgres/models/pet-post-model';
import { FinderUserService } from '../../users/services/finder-user-service';

export class CreatorPetPostService {
	constructor(private readonly finderuserService: FinderUserService) {}

	async execute(userData: any, userId: string) {
		const pet = new PetPost();

		const user = await this.finderuserService.execute(userId);

		pet.pet_name = userData.pet_name;
		pet.description = userData.description;
		pet.hasFound = false;
		pet.user = user;

		try {
			await pet.save();
			return {
				message: 'Post created successfuly',
			};
		} catch (error) {
			console.error('Error ocurred:', error);
			throw new Error('An error ocurred while registering the post');
		}
	}
}
