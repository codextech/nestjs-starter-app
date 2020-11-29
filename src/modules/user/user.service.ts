import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateResult, PaginateModel } from 'mongoose';
import { UserDocument } from './interface/UserDocument';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: PaginateModel<UserDocument>,
      ) {}
      
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
}
