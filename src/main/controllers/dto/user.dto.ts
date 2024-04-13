import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Gender, MaritalStatus } from "migrations/1712414672658-UserMigration";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  @IsString()
  date_of_birthday: Date;
  @IsEnum(MaritalStatus)
  @IsNotEmpty()
  marital_status: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
