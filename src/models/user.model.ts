import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { RoleType } from 'src/core/common/constants/role-type';

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, lowercase: true },
    lastName: { type: String, lowercase: true },
    email: { type: String, lowercase: true },
    phone: { type: String },
    password: { type: String },
    avatar: { type: String },

    // user can have user role and as well as company team role same time
    roles: [
      {
        type: String,
        enum: [
          RoleType.ADMIN,
          RoleType.USER,
          RoleType.COMPANY,
          RoleType.COMPANYTEAM,
        ],
        default: RoleType.USER,
      },
    ],

    // it will used for the users wo wil registered under specific company
    company: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    /* external social login */
    facebook: {
      id: { type: String },
      token: { type: String },
      email: { type: String },
      name: { type: String },
    },
    google: {
      id: { type: String },
      token: { type: String },
      email: { type: String },
      name: { type: String },
    },
    /* external social login */

    // verification part
    isVerified: { type: Boolean, default: false }, // email verify
    verifyToken: { type: String },
    verifyShortToken: { type: String },
    verifyExpires: { type: Date },
    verifyChanges: { type: Object },
    resetToken: { type: String },
    resetShortToken: { type: String },
    resetExpires: { type: Date },
    //end verificatoin part

    // sofe delete
    isDeleted: { type: Boolean, default: false },
    //
  },
  {
    timestamps: true,
  },
);
