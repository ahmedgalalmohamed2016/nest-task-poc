import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param, Put, Delete,UseGuards } from '@nestjs/common';
import { CollectionsService } from 'src/collections/services/collections.service';
import { Collection } from 'src/collections/entities/collections.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('api/collections')
export class CollectionsController {
    constructor(
        private collectionService: CollectionsService
    ) { }

    @Get('findall/:page')
    @Roles('type:collection','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    findAll(@Param('page') page: number): Promise<Collection[]> {
        return this.collectionService.findAll(page);
    }

    @Get(':id')
    @Roles('type:collection','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    findCollection(@Param('id') id: string): Promise<Collection> {
        return this.collectionService.findCollection(id);
    }

    @Post()
    @Roles('type:collection','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    create(@Body() body: any) {
        return this.collectionService.create(body);
    }

    @Put(':id')
    @Roles('type:collection','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    update(@Param('id') id: string, @Body() body: any) {
        return this.collectionService.update(id, body);
    }
}
