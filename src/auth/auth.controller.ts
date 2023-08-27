import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { hashPassword, validatePassword } from './helpers/password.helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DuplicateRecordError } from 'src/common/errors/duplicate.error';
import { generateJWTToken } from 'src/common/helpers/jwt.helper';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: UserRegisterDto) {
    // hash password
    const hash = await hashPassword(user.password);
    user.password = hash;

    // save to db
    try {
      const createdUser = await this.authService.createUser(user);
      delete createdUser.password;
      return { success: true, user: createdUser };
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new DuplicateRecordError('Email Already Exist');
      }
      throw err;
    }
  }

  emailPasswordException = (email: string) => {
    Logger.warn(email + ': Incorrect email or password');
    throw new HttpException(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Incorrect email or password',
      },
      HttpStatus.UNAUTHORIZED,
    );
  };

  @Post('login')
  async login(
    @Body()
    user: UserLoginDto,
  ) {
    const existUser = await this.authService.user({
      email: user.email,
    });
    if (!existUser) {
      this.emailPasswordException(user.email);
    }

    // validate password
    const isValid = await validatePassword(user.password, existUser.password);
    if (isValid) {
      const jwt = generateJWTToken(existUser);
      delete existUser.password;
      return { success: true, user: existUser, token: jwt };
    } else {
      this.emailPasswordException(user.email);
    }
  }
}
