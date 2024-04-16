import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'IsNotEmpty' })
  email: string;

  @IsNotEmpty({ message: 'IsNotEmpty' })
  password: string;
}
