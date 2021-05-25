import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'src/items/entities/items.entity';
import { Collection } from 'src/collections/entities/collections.entity';
import { validate } from 'class-validator';
import { messages } from 'src/utils/errorMessages';

@Injectable()
export class ItemsService {

    constructor(@InjectRepository(Item) private itemRepo: Repository<Item>,
        @InjectRepository(Collection) private collectionRepo: Repository<Collection>) {
    }

    async create(body: any) {
        try {

            if (!body.collectionId)
                return messages.notvalidCollection;

            const newItem = new Item();
            newItem.name = body.name;
            newItem.parentId = body.collectionId;

            const errors = await validate(newItem)
            if (errors.length > 0) throw errors;

            // Check for collection 
            const collection = await this.collectionRepo.findOne(body.id);
            if (!collection)
                return messages.notvalidCollection;

            // Check for item name in same collection 
            const itemIsDublicate = await this.itemRepo.findAndCount({ parentId: body.collectionId, name: body.name });

            if (itemIsDublicate && itemIsDublicate[1] > 0) throw messages.itemAddedBefore;
            return this.itemRepo.save(newItem);
        } catch (err) {
            return err;
        }
    }


    async collectionItems(id: string): Promise<Item[]> {
        try {

            return await this.itemRepo.find({ parentId: id });
        } catch (err) {
            return err;
        }
    }


    async findItemsForGuard(ids: any): Promise<Item[]> {
        try {
            return await this.itemRepo.findByIds(ids);

        } catch (err) {
            return err;
        }
    }


    async findItem(id: string): Promise<Item> {
        try {
            return await this.itemRepo.findOne(id);
        } catch (err) {
            return err;
        }
    }


    async update(id: string, body: any) {
        try {
            const newItem = new Item();
            newItem.name = body.name;

            const errors = await validate(newItem)
            if (errors.length > 0) throw errors;

            const getItem = await this.itemRepo.findOne(id);
            if (!getItem)
                throw messages.noItemfound;

            // Check if updated name used before
            const items = await this.itemRepo.findAndCount({ parentId: getItem.parentId, name: body.name });
            if (items && items[1] > 0) throw messages.itemAddedBefore;
            //update collection

            this.itemRepo.merge(getItem, newItem);
            return this.itemRepo.save(getItem);
        } catch (err) {
            return err;
        }
    }

}
