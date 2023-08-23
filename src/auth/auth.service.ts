import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    try {
      const { name, email, password } = signUpDto;
      const hashPassword = await bcrypt.hash(password, 20);

      const user = await this.userModel.create({
        name,
        email,
        password: hashPassword,
      });

      const token = this.jwtService.sign({ id: user._id });

      return { token };
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    try {
      const { email, password } = loginDto;
      const user = await this.userModel.findOne({ email: email });

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const matches = await bcrypt.compare(password, user.password);

      if (!matches) {
        throw new UnauthorizedException('Invalid password');
      }
      const token = this.jwtService.sign({ id: user._id });
      return { token };
    } catch (error) {
      console.log('Login failed: ', error.message);
      throw error;
    }
  }
}
