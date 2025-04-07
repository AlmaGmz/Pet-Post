import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PetPost } from './pet-post-model';

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 70,
		nullable: false,
	})
	fullname: string;

	@Column('varchar', {
		length: 255,
		nullable: false,
	})
	password: string;

	@Column('varchar', {
		length: 50,
		nullable: false,
		unique: true,
	})
	email: string;

	@Column('varchar', {
		length: 20,
		nullable: false,
	})
	phone_number: string;

	@Column('enum', {
		enum: UserRole,
		default: UserRole.USER,
		nullable: false,
	})
	rol: UserRole;

	@Column('boolean', {
		default: false,
		nullable: false,
	})
	status: boolean;

	@Column('timestamp', {
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false,
	})
	created_at: Date;

	@OneToMany(() => PetPost, (petPost) => petPost.user)
	petPost: PetPost[];
}
