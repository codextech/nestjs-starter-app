import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './interface/UserDocument';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
      ) {}
      
      async findAll(query): Promise<UserDocument[]> {
        return await this.userModel
          .find(query)
      }

      async findOne(query): Promise<UserDocument> {
        return (await this.userModel
          .findOne(query))
      }
}
