import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param, Put, Delete,UseGuards } from '@nestjs/common';
import { ItemsService } from 'src/items/services/items.service';
import { Item } from 'src/items/entities/items.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('api/items')
export class ItemsController {

    constructor(
        private itemService: ItemsService
    ) { }

    @Post()
    @Roles('type:item','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    create(@Body() body: any) {
        return this.itemService.create(body);
    }

    @Get(':id')
    @Roles('type:item','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    findItem(@Param('id') id: string): Promise<Item> {
        return this.itemService.findItem(id);
    }

    //Get items by collection id
    @Get('collection/:id')
    @Roles('type:item','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    collectionItems(@Param('id') id: string): Promise<Item[]> {
        return this.itemService.collectionItems(id);
    }



    @Put(':id')
    @Roles('type:item','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    update(@Param('id') id: string, @Body() body: any) {
        return this.itemService.update(id, body);
    }

    // @Delete(':id')
    // delete(@Param('id') id: number) {
    //     return this.userService.remove(id);
    // }



}

