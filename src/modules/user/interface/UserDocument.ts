
import { Document } from 'mongoose';

export interface UserDocument extends Document {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    profileImage: string
   
    // verification part
    isVerified: boolean // email verify
    verifyToken: string
    verifyShortToken: string
    verifyExpires: Date
    verifyChanges: Object
    resetToken: string
    resetShortToken: string
    resetExpires: Date
    //end verificatoin part


    // sofe delete
    isDeleted : boolean
}