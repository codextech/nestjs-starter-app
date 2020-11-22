import { IsNotEmpty, IsOptional, IsString } from "class-validator";




export class UpdateUserDto {

    @IsString()
    @IsNotEmpty({message : 'Phone Number is not valid'})
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    firstName?: string;
  
    @IsString()
    @IsOptional()
    lastName?: string;
  
  
    @IsString()
    @IsOptional()
    profileImage?: string;

      password?;
      verifyShortToken?;
      verifyExpires?;
      isVerified?
      verifyToken?;
      resetToken?;
      resetShortToken?;
      resetExpires?;
  }
  