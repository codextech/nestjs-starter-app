

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';


@Injectable()
export class AwsS3Service {


    private _s3: AWS.S3;
    constructor(private configService: ConfigService) {
      this.awsS3Config();
    }
  
   private awsS3Config() {
      const s3 = new AWS.S3();
      AWS.config.update({
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || process.env.AWS_SECRET_ACCESS_KEY,
        region : this.configService.get<string>('AWS_REGION')
      });
      this._s3 = s3;
    }
  
    async getPreSignedUrl(query : any) {
      const { name, type, path } = query;
      const bucketFolder = path || 'shafi-temp';
      const params = {
        Expires: 60 * 5,
        Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME') || 'mazajstorage',
        ACL: 'public-read', // ANY ACL YOU LIKE,
        Key: `${bucketFolder}/${Date.now()}-${name}`,
        ContentType: type,
      };
  
      const result = await this._s3.getSignedUrlPromise('putObject', params);
      return {
          key: params.Key, // file path+name
          signedUrl: result,
        };
    }

}