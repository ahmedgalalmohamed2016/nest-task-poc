import { Entity, Column, PrimaryGeneratedColumn ,OneToMany} from 'typeorm';
import { IsEmail, IsEnum,IsAlpha,IsEmpty,IsString, Length } from 'class-validator';
import { Collection } from 'src/collections/entities/collections.entity';

@Entity()
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        nullable: true,
    })
    @IsString({message: 'Must be a character'})
    name: string

    @Column({
        unique: false,
        nullable: false,
    })
    parentId : string

}