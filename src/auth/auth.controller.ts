import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name); // Create instance of Logger
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    this.logger.log(
      `User sign up { Name: ${signUpDto.name}, Email: ${signUpDto.email} }`,
    );
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    this.logger.log(`User sign up: ${loginDto.email}`); // Logging
    return this.authService.login(loginDto);
  }
}
