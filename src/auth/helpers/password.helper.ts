import { InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    Logger.error('Error on hashing password: ' + err);
    throw new InternalServerErrorException();
  }
};

export const validatePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compareSync(password, hash);
  } catch (err) {
    Logger.error('Error on hashing password: ' + err);
    throw new InternalServerErrorException();
  }
};
