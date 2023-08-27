import { Logger } from '@nestjs/common';
import { Users } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

const jwt_secret = process.env.JWT_SECRET;

export const generateJWTToken = (user: Users): string => {
  return jwt.sign(
    {
      email: user.email,
      user_id: user.user_id,
    },
    jwt_secret,
    { expiresIn: '24h' },
  );
};

export const validateDecodedJWT = (jwtString: string) => {
  return jwt.verify(jwtString, jwt_secret);
};
