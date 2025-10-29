import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto): Promise<void> {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  singin(@Body() singin: SigninDto): Promise<>{
    return this.authService.signin(singin);
  }
}
