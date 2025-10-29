import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class SigninDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    password: string;
}