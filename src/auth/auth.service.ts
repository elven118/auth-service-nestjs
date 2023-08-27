import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UsersWhereUniqueInput,
  ): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    return this.prisma.users.create({
      data,
    });
  }
}
