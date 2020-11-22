
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
      firstName: { type: String , lowercase: true },
      lastName: { type: String , lowercase: true  },
      email: { type: String, unique: true , lowercase: true },
      phone: { type: String , unique: true },
      password: { type: String, required: true },
      profileImage: { type: String },
     
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
      isDeleted : {type: Boolean , default : false},
      //
    },
    {
      timestamps: true,
    },
  );