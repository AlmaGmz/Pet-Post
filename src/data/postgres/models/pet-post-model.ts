import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user-model';

export enum PetPostStatus {
	PENDING = 'pending',
	APPROVED = 'approved',
	REJECTED = 'rejected',
}

@Entity()
export class PetPost extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 255,
	})
	pet_name: string;

	@Column({
		type: 'text',
	})
	description: string;

	@Column('varchar', {
		length: 255,
		nullable: true,
	})
	image_url: string;

	@Column('enum', {
		enum: PetPostStatus,
		default: PetPostStatus.PENDING,
	})
	status: PetPostStatus;

	@Column('boolean', {
		default: false,
	})
	hasFound: boolean;

	@CreateDateColumn()
	created_at: Date;

	@ManyToOne(() => User, (user) => user.petPost)
	user: User;
}
