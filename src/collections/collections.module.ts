import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Group} from 'src/groups/entities/groups.entity';
import { GroupsService } from 'src/groups/services/groups.service';
import { CollectionsService } from 'src/collections/services/collections.service';
import { CollectionsController } from 'src/collections/controllers/collections.controller';
import { Collection} from 'src/collections/entities/collections.entity';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/users.entity';
import { Role} from 'src/roles/entities/roles.entity';
import { Item} from 'src/items/entities/items.entity';
import { ItemsService } from 'src/items/services/items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection,User,Role,Group,Item])
  ],
  providers: [CollectionsService,UsersService,GroupsService,ItemsService],
  controllers: [CollectionsController]
})
export class CollectionsModule {}
