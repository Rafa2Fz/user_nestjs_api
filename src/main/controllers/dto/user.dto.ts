import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Gender, MaritalStatus } from 'migrations/1712414672658-UserMigration';
import { IAddress } from 'src/domain/entities';

class AddressCreateDto {
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  cep: string;
  @IsString()
  @IsNotEmpty()
  number: string;
  @IsString()
  @IsNotEmpty()
  district: string;
  @IsString()
  @MaxLength(2)
  @IsNotEmpty()
  state: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsOptional()
  complement?: string;
}
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
  @IsArray()
  @IsOptional()
  addresses: Array<AddressCreateDto>;
}

class AddressUpdateDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  cep: string;
  @IsString()
  @IsNotEmpty()
  number: string;
  @IsString()
  @IsNotEmpty()
  district: string;
  @IsString()
  @MaxLength(2)
  @IsNotEmpty()
  state: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  complement?: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsEnum(Gender)
  @IsOptional()
  gender: string;
  @IsNotEmpty()
  @IsOptional()
  date_of_birthday: Date;
  @IsEnum(MaritalStatus)
  @IsOptional()
  marital_status: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsOptional()
  password: string;
  @IsArray()
  @IsOptional()
  addresses: Array<AddressUpdateDto>;
}

export class UserFinddAllQuery {
  @IsOptional()
  @IsString()
  email?: string;
  @IsOptional()
  @IsString()
  order_field?: string;
  @IsOptional()
  @IsString()
  type?: 'ASC' | 'DESC';
}

export class PaginationHeaderOptions {
  @IsOptional()
  @IsString()
  'rest-mode': 'paginate' | 'list';
  @IsOptional()
  @IsString()
  'rest-page': string;
  @IsOptional()
  @IsString()
  'rest-limit': string;
}
