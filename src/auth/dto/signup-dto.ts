import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsDate, IsOptional, Matches } from "class-validator";

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' })
    password: string;

}