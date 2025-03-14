export class CreatePostDto {
	constructor(
		public pet_name: string,
		public owner: string,
		public description: string,
	) {}

	static execute(object: { [key: string]: any }): [string?, CreatePostDto?] {
		const { pet_name, owner, description } = object;

		if (!pet_name) return ['pet_name is required'];
		if (!owner) return ['owner is required'];
		if (!description) return ['description is required'];

		return [
			undefined,
			new CreatePostDto(
				pet_name.trim().toLowerCase(),
				owner.trim().toLowerCase(),
				description.trim(),
			),
		];
	}
}
