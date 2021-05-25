import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Group } from 'src/groups/entities/groups.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // valid: 'regular', 'manager', 'globalManager'
    @Column()
    role: string


    // for globalManager groupId is null
    @Column()
    groupId: string



//   @ManyToOne(() => User, user => user.roles)
//     user: User;

}