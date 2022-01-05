import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateResult, PaginateModel } from 'mongoose';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { User, UserDocument } from './interface/UserDocument';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

    constructor(
        @InjectModel('User') private readonly userModel: PaginateModel<UserDocument>,
      ) {

      }
      
      async findAll(query): Promise<PaginateResult<UserDocument>> {
        // return await this.userModel
        //   .find(query)
        const result = await this.userModel.paginate({} , query);
        return result
      }

      async findOne(query): Promise<UserDocument> {
        return (await this.userModel
          .findOne(query))
      }


      async create(userCreate : any): Promise<UserDocument> {
        const user = await this.userModel.create(userCreate);
        return user;
      }
}
