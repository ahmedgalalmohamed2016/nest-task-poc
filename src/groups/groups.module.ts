import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/services/groups.service';
import { GroupsController } from 'src/groups/controllers/groups.controller';
import { Group} from 'src/groups/entities/groups.entity';
import { Collection } from 'src/collections/entities/collections.entity';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/users.entity';
import { Role } from 'src/roles/entities/roles.entity';
import { Item} from 'src/items/entities/items.entity';
import { ItemsService } from 'src/items/services/items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role,Group,Collection,User,Item])
  ],
  providers: [GroupsService,UsersService,ItemsService],
  controllers: [GroupsController]
})
export class GroupsModule {}
