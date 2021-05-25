import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../entities/collections.entity';
import { validate } from 'class-validator';
import { messages } from 'src/utils/errorMessages';

@Injectable()
export class CollectionsService {

    constructor(@InjectRepository(Collection) private collectionRepo: Repository<Collection>) {
    }

    async findAll(page: number): Promise<Collection[]> {
        try {
            if (page < 1) throw "Please enter valid page number";
            const skipPage = (page - 1) * 10;
            return await this.collectionRepo.find({ skip: skipPage, take: 10, order: { name: "ASC" } });
        } catch (err) {
            return err;
        }
    }

    async findCollection(id: string): Promise<Collection> {
        try {
            return await this.collectionRepo.findOne(id);
        } catch (err) {
            return err;
        }
    }

    async create(body: any) {
        try {
            const newCollection = new Collection();
            newCollection.name = body.name;

            const errors = await validate(newCollection)
            if (errors.length > 0) throw errors;

            const collections = await this.collectionRepo.findAndCount({ name: body.name });

            if (collections && collections[1] > 0) throw 'This collection name was added before';
            return this.collectionRepo.save(newCollection);
        } catch (err) {
            return messages.errorHappened;
        }
    }

    async update(id: string, body: any) {
        try {
            const newCollection = new Collection();
            newCollection.name = body.name;

            const errors = await validate(newCollection)
            if (errors.length > 0) throw errors;
            // Check if updated name used before
            const collections = await this.collectionRepo.findAndCount({ name: body.name });
            if (collections && collections[1] > 0) throw 'This collection name was added before';
            //update collection
            const getCollection = await this.collectionRepo.findOne(id);
            this.collectionRepo.merge(getCollection, newCollection);
            return this.collectionRepo.save(getCollection);
        } catch (err) {
            return messages.errorHappened;
        }
    }
}
