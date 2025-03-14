import {
	PetPost,
	PetPostStatus,
} from '../../../data/postgres/models/pet-post-model';
import { UpdatePostDto } from '../../../domain/dtos/post-pet/update-post-dto';

export class UpdatePetPostService {
	async execute(userId: string, userData: UpdatePostDto) {
		const updatePetPostService = await this.ensurePostExits(userId);

		if (userData.pet_name) updatePetPostService.pet_name = userData.pet_name;
		if (userData.owner) updatePetPostService.owner = userData.owner;
		if (userData.description)
			updatePetPostService.description = userData.description;

		try {
			await updatePetPostService.save();
			return {
				message: 'Post updated successfully',
			};
		} catch (error) {
			console.error('Error during update:', error);
			throw new Error('An error occurred while updating the post');
		}
	}

	async approve(userId: string): Promise<{ message: string }> {
		const petPost = await this.ensurePostExits(userId);
		petPost.status = PetPostStatus.APPROVED;
		await petPost.save();
		return { message: 'Post approved successfully' };
	}

	async reject(userId: string): Promise<{ message: string }> {
		const petPost = await this.ensurePostExits(userId);
		petPost.status = PetPostStatus.REJECTED;
		await petPost.save();
		return { message: 'Post rejected successfully' };
	}

	private async ensurePostExits(userId: string): Promise<PetPost> {
		const pet = await PetPost.findOne({
			where: {
				id: userId,
			},
		});
		if (!pet) {
			throw new Error(`Post with id: ${userId} not found`);
		}
		return pet;
	}
}
