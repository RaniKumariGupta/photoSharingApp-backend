import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,  ManyToOne} from "typeorm";
import { User } from "./UserEntity";

@Entity()
    export class Photo {
        @PrimaryGeneratedColumn()
        id?: number

        @CreateDateColumn()
        createdAt?: Date;

        @UpdateDateColumn()
        updatedAt?: Date;

        @Column()
        caption!: string;

        // @Column()
        // image!: string;

        @Column()
        url!: string;

        @ManyToOne(() => User, user => user.photos) 
        user!: User;

    }
