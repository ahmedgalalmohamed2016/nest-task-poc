import { Entity, Column, PrimaryColumn ,PrimaryGeneratedColumn,ManyToOne, OneToMany} from 'typeorm';
import { IsEmail, IsEnum,IsAlpha,IsEmpty,IsString, Length } from 'class-validator';
import { Item } from '../../items/entities/items.entity';
import { Group } from '../../groups/entities/groups.entity';


@Entity()
export class Collection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    @IsString({message : "Please enter valid name"})
    name: string

   // @ManyToOne(type => Group, group => group.collectionIds) group: Group;

}