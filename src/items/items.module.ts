import { Module } from '@nestjs/common';
import { ItemsController } from 'src/items/controllers/items.controller';
import { ItemsService } from 'src/items/services/items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/items.entity';
import { Collection } from 'src/collections/entities/collections.entity';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/users.entity';
import { Role } from 'src/roles/entities/roles.entity';
import { Group} from 'src/groups/entities/groups.entity';
import { GroupsService } from 'src/groups/services/groups.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Collection,Role,User,Group])
  ],
  controllers: [ItemsController],
  providers: [ItemsService,UsersService,GroupsService]
})
export class ItemsModule { }
