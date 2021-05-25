import { Controller, Get, Param, Body, UsePipes, ValidationPipe, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/users.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('api/users')
export class UsersController {

    constructor(
        private userService: UsersService
    ) { }

    @Get()
    @Roles('type:users','globalManager')
    @UsePipes(ValidationPipe)
    findAll() {
        return this.userService.findAll();
    }

    @Get('roles')
    @Roles('type:users','globalManager')
    @UsePipes(ValidationPipe)
    getRoles() {
        return this.userService.getRoles();
    }

    @Get(':id')
    @Roles('type:users','globalManager')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Post()
    @Roles('type:users','globalManager')
    create(@Body() body: any) {
        return this.userService.create(body);
    }

    @Put(':id')
    @Roles('type:users','globalManager')
    update(@Param('id') id: number, @Body() body: any) {
        return this.userService.update(id, body);
    }

    @Delete(':id')
    @Roles('type:users','globalManager')
    delete(@Param('id') id: number) {
        return this.userService.remove(id);
    }



}
