import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Collection } from '../../collections/entities/collections.entity';

@Entity()
export class Group {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string


    @Column("simple-array")
    collectionIds: string[];

}