import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserSchema } from 'src/models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import * as mongoosePaginate  from 'mongoose-paginate-v2';
import { paginateOptions } from 'src/core/common/paginate/paginate-options';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{ name: 'User',
    useFactory: () => {
      const schema = UserSchema;

      mongoosePaginate.paginate.options = paginateOptions
      schema.plugin(mongoosePaginate); //pagination plugin
      return schema;
    } }]),
    SharedModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
