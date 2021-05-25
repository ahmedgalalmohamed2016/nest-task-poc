import { Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, getManager, getConnection, getRepository } from 'typeorm';
import { Group } from 'src/groups/entities/groups.entity';
import { Collection } from 'src/collections/entities/collections.entity';
import { Role } from 'src/roles/entities/roles.entity';
import { validate } from 'class-validator';
import { messages } from 'src/utils/errorMessages';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>) {
  }


  async create(body: any) {
    try {
      const newUser = new User();
      newUser.email = body.email;
      newUser.roles = body.roles;
      const errors = await validate(newUser)
      if (errors.length > 0) throw errors;


      // Check for collections ids 
      let handledRoles = JSON.parse(body.roles);
      newUser.roles = handledRoles;

      // Check for email is duplicate 
      const emailIsDublicate = await this.userRepo.findAndCount({ email: body.email });
      if (emailIsDublicate && emailIsDublicate[1] > 0) throw messages.emailAddedBefore;

      const checkRoles: any = await this.roleRepo.findByIds(handledRoles);
      if (checkRoles && checkRoles.length != handledRoles.length) throw messages.notvalidRole;
      console.log(newUser);
      newUser.roles = checkRoles;
      return this.userRepo.save(newUser);
    } catch (err) {
      return err
    }
  }

  async findAll() {
    return this.userRepo.find();
  }

  async getRoles() {
    return this.roleRepo.find();
  }

  async findOne(id: string) {
    return this.userRepo.findOne(id);
  }


  async update(id: number, body: any) {
    const task = await this.userRepo.findOne(id);
    this.userRepo.merge(task, body);
    return this.userRepo.save(task);
  }

  async remove(id: number) {
    await this.userRepo.delete(id);
    return true;
  }
}
