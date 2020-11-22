import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<any>,
      ) {}
      
      async findAll(query): Promise<any> {
        return await this.userModel
          .find(query)
      }

      async findOne(query): Promise<any> {
        return await this.userModel
          .findOne(query)
      }
}
