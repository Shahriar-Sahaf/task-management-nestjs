import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SignupDto } from './dto/signup-dto';
import { SigninDto } from './dto/signin-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) {}

    async signup(signupDto: SignupDto): Promise<User> {
       const user : SignupDto = {
        name: signupDto.name,
        email: signupDto.email,
        password: await bcrypt.hash(signupDto.password, 10)
       };
       return this.authRepository.createUser(user);
    }

    async signin(signinDto: SigninDto): Promise<{ token: string }> {
       const { email, password } = signinDto;
       const checkexist = await this.authRepository.findUserByEmail(email);
       if (!checkexist){
        throw new NotFoundException('User not found');
       }
       const isMatch = await bcrypt.compare(password, checkexist.password);
       if (!isMatch){
        throw new UnauthorizedException('Invalid password');
       }
       const token = this.jwtService.sign({ id: checkexist.id });
       return { token };
    }
}
