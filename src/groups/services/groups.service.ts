import { Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, getManager, getConnection, getRepository } from 'typeorm';
import { Group } from 'src/groups/entities/groups.entity';
import { Collection } from 'src/collections/entities/collections.entity';
import { Role } from 'src/roles/entities/roles.entity';
import { validate } from 'class-validator';
import { messages } from 'src/utils/errorMessages';

@Injectable()
export class GroupsService {

    constructor(@InjectRepository(Group) private groupRepo: Repository<Group>,
        @InjectRepository(Collection) private collectionRepo: Repository<Collection>,
        @InjectRepository(Role) private roleRepo: Repository<Role>
    ) {
    }

    async create(body: any) {
        try {
            let _group: any = {};
            let _roles: any = [];
            const newGroup = new Group();
            newGroup.name = body.name;
            newGroup.collectionIds = body.collectionIds;

            const newManagerRole = new Role();
            newManagerRole.role = 'manager';
            const newRegularRole = new Role();
            newRegularRole.role = 'regular';

            const errors = await validate(newGroup)
            if (errors.length > 0) throw errors;

            // Check for group name is duplicate 
            const groupIsDublicate = await this.groupRepo.findAndCount({ name: body.name });
            if (groupIsDublicate && groupIsDublicate[1] > 0) throw messages.groupAddedBefore;

            // Check for collections ids 
            let handledCollections = JSON.parse(body.collectionIds);

            const checkCollections = await this.collectionRepo.findByIds(handledCollections);
            if (checkCollections && checkCollections.length != handledCollections.length) throw messages.notvalidCollection;

            await getManager().transaction(async transactionalEntityManager => {
                _group = await this.groupRepo.save(newGroup);
                newManagerRole.groupId = _group.id;
                newRegularRole.groupId = _group.id;
                _roles[0] = await this.roleRepo.save(newManagerRole);
                _roles[1] = await this.roleRepo.save(newRegularRole);
            });
            return { group: _group, roles: _roles };

        } catch (err) {
            return err;
        }
    }

    async findAll(page: number): Promise<Group[]> {
        try {
            if (page < 1) throw "Please enter valid page number";
            const skipPage = (page - 1) * 10;
            return await this.groupRepo.find({ skip: skipPage, take: 10, order: { name: "ASC" } });
        } catch (err) {
            return err;
        }
    }

    async findGroup(id: string): Promise<Group> {
        try {
            let result: any = {};
            const group = await this.groupRepo.findOne(id);
            result.group = group;
            let handledCollections = JSON.parse(result.group.collectionIds);
            result.collections = await this.collectionRepo.findByIds(handledCollections);
            result.roles = await this.roleRepo.find({ where: { groupId: id } });
            return result;

        } catch (err) {
            return err;
        }
    }

    async findGroupsForGuard(ids: any): Promise<Group> {
        try {
            let result: any = [];
            let res:any = [];
            result = await this.groupRepo.findByIds(ids);

            for (let i = 0; i < result.length; i++) {

                let c = JSON.parse(result[i].collectionIds);
                
                for (let y = 0; y < c.length; y++) {
                    res.push(c[y]);
                }

            }
            return res;

        } catch (err) {
            return err;
        }
    }

    async update(id: string, body: any) {
        try {
            const newGroup = new Group();
            newGroup.name = body.name;
            newGroup.collectionIds = body.collectionIds;

            const errors = await validate(newGroup)
            if (errors.length > 0) throw errors;

            // Check if updated name used before
            const groups = await this.groupRepo.findAndCount({ name: body.name });
            if (groups && groups[1] > 0) throw messages.groupAddedBefore;

            // Check for collections ids 
            let handledCollections = JSON.parse(body.collectionIds);

            const checkCollections = await this.collectionRepo.findByIds(handledCollections);
            if (checkCollections && checkCollections.length != handledCollections.length) throw messages.notvalidCollection;


            //update collection
            const getGroup = await this.groupRepo.findOne(id);
            this.groupRepo.merge(getGroup, newGroup);

            return this.groupRepo.update({ id: getGroup.id }, newGroup);
        } catch (err) {
            return err;
        }
    }

}
