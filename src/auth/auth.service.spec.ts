import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/db/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService], // Provide PrismaService as well
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  // describe('createUser', () => {
  //   it('should create a user', async () => {
  //     const mockUser = {
  //       /* Define your mock user object here */
  //     };
  //     prismaService.users.create = jest.fn().mockResolvedValue(mockUser);

  //     const result = await service.createUser({
  //       /* Provide the user data here */
  //     });

  //     expect(result).toBe(mockUser);
  //   });
  // });

  describe('user', () => {
    it('should return a user', async () => {
      const mockUser = {
        email: 'authServiceTest@email.com',
        password: 'pls ignore this user',
      };
      prismaService.users.findUnique = jest.fn().mockResolvedValue(mockUser);

      const result = await service.user({
        email: 'authServiceTest@email.com',
      });

      expect(result).toBe(mockUser);
    });
  });
});
