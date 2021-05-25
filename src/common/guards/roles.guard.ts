import { CanActivate, ExecutionContext, Injectable, Inject, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/services/users.service';
import { GroupsService } from 'src/groups/services/groups.service';
import { ItemsService } from 'src/items/services/items.service';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        @Inject(forwardRef(() => ItemsService))
        private itemService: ItemsService,
        @Inject(forwardRef(() => GroupsService))
        private groupService: GroupsService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        //920c7a36-6ab3-410e-a446-9908f3004121  globalmanager
        //31ea3ef8-da12-44b4-ae74-ac0a7484835e manager

        // Here this id comming from decrypt token "authentication" module not included in this taks
        let user: any = await this.userService.findOne('31ea3ef8-da12-44b4-ae74-ac0a7484835e');
        let hasPermission: boolean = false;
        let collections: any;
        let _roles = [];
        if (user.roles.length == 0) {
            hasPermission = true;
        } else {

            // case groups api's
            if (roles[0] == 'type:group') {
                if (!request.params.id)
                    hasPermission = false;
                else {
                    for (let i = 0; i < user.roles.length; i++) {
                        if (roles.indexOf(user.roles[i].role) > -1) {
                            if (user.roles[i].groupId == request.params.id) {
                                hasPermission = true;
                                break;
                            }
                        }
                    }
                }
            }

            // case colletions api's
            if (roles[0] == 'type:collection') {
                if (!request.params.id)
                    hasPermission = false;
                else {
                    for (let i = 0; i < user.roles.length; i++) {
                        _roles.push(user.roles[i].groupId);
                    }
                    collections = await this.groupService.findGroupsForGuard(_roles);
                    for (let x = 0; x < collections.length; x++) {
                        if (collections[x] == request.params.id) {
                            hasPermission = true;
                            break;
                        }
                    }
                }
            }

            // case items api's
            if (roles[0] == 'type:item') {
                if (!request.params.id)
                    hasPermission = false;
                else {
                    for (let i = 0; i < user.roles.length; i++) {
                        _roles.push(user.roles[i].groupId);
                    }
                    collections = await this.groupService.findGroupsForGuard(_roles);
                   console.log(collections);
                   
                    let items: any = await this.itemService.findItemsForGuard(collections);
                    for (let x = 0; x < items.length; x++) {
                        if (items[x] == request.params.id) {
                            hasPermission = true;
                            break;
                        }
                    }

                }
            }

        }

        return user && user.roles && hasPermission;

    }
}