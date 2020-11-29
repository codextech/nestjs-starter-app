import { Document } from 'mongoose';
import { RoleType } from 'src/core/common/constants/role-type';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  avatar: string;

  // user can have user role and as well as company team role same time
  roles: [
    {
      type: String;
      enum: [
        RoleType.ADMIN,
        RoleType.USER,
        RoleType.COMPANY,
        RoleType.COMPANYTEAM,
      ];
      default: RoleType.USER;
    },
  ];

  // it will used for the users wo wil registered under specific company
  company: string;

  /* external social login */
  facebook: {
    id: string;
    token: string;
    email: string;
    name: string;
  };
  google: {
    id: string;
    token: string;
    email: string;
    name: string;
  };
  /* external social login */

  // verification part
  isVerified: boolean; // email verify
  verifyToken: string;
  verifyShortToken: string;
  verifyExpires: Date;
  verifyChanges: Object;
  resetToken: string;
  resetShortToken: string;
  resetExpires: Date;
  //end verificatoin part

  // sofe delete
  isDeleted: boolean;
}
