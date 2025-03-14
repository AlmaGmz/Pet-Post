import { PetPost } from '../../../data/postgres/models/pet-post-model';

export class EliminatorPetPostService {
	async execute(userId: string) {
		const eliminatorPetPostService = await this.ensurePetPostExits(userId);

		eliminatorPetPostService.hasFound = true;

		try {
			await eliminatorPetPostService.save();
		} catch (error) {
			throw new Error('An error ocurred while deleting the post');
		}
	}

	private async ensurePetPostExits(userId: string) {
		const pet = await PetPost.findOne({
			select: ['id'],
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
