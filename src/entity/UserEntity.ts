import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Photo } from "./photoEntity";
@Entity()
    export class User {
        @PrimaryGeneratedColumn()
        id?: number

        @Column()
        firstName!: string;
      
        @Column()
        lastName!: string;
      
        @Column()
        email!: string;

        @CreateDateColumn()
        createdAt?: Date;

        @UpdateDateColumn()
        updatedAt?: Date;

        @Column()
        password?: string;

    @OneToMany(() => Photo, photo => photo.user)
    photos!: Photo[];

    }

    