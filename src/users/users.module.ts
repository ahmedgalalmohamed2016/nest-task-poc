import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';

import { UsersService } from 'src/users/services/users.service';
import { GroupsService } from 'src/groups/services/groups.service';
import { UsersController } from 'src/users/controllers/users.controller';
import { CollectionsService } from 'src/collections/services/collections.service';
import { Collection} from 'src/collections/entities/collections.entity';
import { User} from 'src/users/entities/users.entity';
import { Role} from 'src/roles/entities/roles.entity';
import { Group} from 'src/groups/entities/groups.entity';
import { Item} from 'src/items/entities/items.entity';
import { ItemsService } from 'src/items/services/items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role,Group,Collection,Item])
  ],
  providers: [UsersService,GroupsService,CollectionsService,ItemsService],
  controllers: [UsersController]
})
export class UsersModule {}
