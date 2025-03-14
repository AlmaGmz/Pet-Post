import { PetPost } from '../../../data/postgres/models/pet-post-model';
import { CreatePostDto } from '../../../domain';

export class CreatorPetPostService {
	async execute(userData: CreatePostDto) {
		const pet = new PetPost();

		pet.pet_name = userData.pet_name;
		pet.owner = userData.owner;
		pet.description = userData.description;
		pet.hasFound = false;

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
