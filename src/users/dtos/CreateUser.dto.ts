import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto  {
  @IsNotEmpty()
  @IsEmail()
  email: string

  password: string

  @IsNotEmpty()
  age: number
}