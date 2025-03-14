export class UpdatePostDto {
	constructor(
		public pet_name?: string,
		public owner?: string,
		public description?: string,
	) {}

	static execute(object: { [key: string]: any }): [string?, UpdatePostDto?] {
		const { pet_name, owner, description } = object;

		if (!pet_name && !owner && !description) {
			return ['At least one field must be provided'];
		}

		return [
			undefined,
			new UpdatePostDto(
				pet_name ? pet_name.trim().toLowerCase() : undefined,
				owner ? owner.trim().toLowerCase() : undefined,
				description ? description.trim() : undefined,
			),
		];
	}
}
