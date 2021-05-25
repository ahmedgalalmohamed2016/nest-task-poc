import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param, Put, Delete,UseGuards } from '@nestjs/common';
import { GroupsService } from 'src/groups/services/groups.service';
import { Group } from 'src/groups/entities/groups.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('api/groups')
export class GroupsController {
    constructor(
        private groupService: GroupsService
    ) { }

    @Post()
    @Roles('type:group','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    create(@Body() body: any) {
        return this.groupService.create(body);
    }

    @Get('all/:page')
    @Roles('type:group','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    findAll(@Param('page') page: number): Promise<Group[]> {
        return this.groupService.findAll(page);
    }

    @Get(':id')
    @Roles('type:group','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    findGroup(@Param('id') id: string): Promise<Group> {
        return this.groupService.findGroup(id);
    }


    @Put(':id')
    @Roles('type:group','manager','regular','globalManager')
    @UsePipes(ValidationPipe)
    update(@Param('id') id: string, @Body() body: any) {
        return this.groupService.update(id, body);
    }

}
