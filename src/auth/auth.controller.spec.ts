import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should sign up a new user', async () => {
      // Mock the authService's createUser method
      authService.createUser = jest.fn().mockReturnValue({});

      const result = await authController.signup({
        email: 'test@example.com',
        password: 'testpassword',
      });

      expect(result).toEqual({ success: true });
    });

    // it('should handle signup error', async () => {
    //   // Mock the authService's createUser method to throw an error
    //   authService.createUser = jest.fn().mockImplementation(() => {
    //     throw new Error('Failed to create user');
    //   });

    //   try {
    //     await authController.signup({
    //       email: 'test@example.com',
    //       password: 'testpassword',
    //     });
    //   } catch (error) {
    //     expect(error).toBeInstanceOf(HttpException);
    //     expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    //   }
    // });
  });

  describe('login', () => {
    // it('should log in an existing user', async () => {
    //   // Mock the authService's getUserByEmail method to return a user
    //   authService.getUserByEmail = jest.fn().mockReturnValue({
    //     email: 'test@example.com',
    //     password: 'testpassword',
    //   });
    //   // Mock the validatePassword function to return true
    //   validatePassword = jest.fn().mockReturnValue(true);
    //   const result = await authController.login({
    //     email: 'test@example.com',
    //     password: 'testpassword',
    //   });
    //   expect(result).toEqual({ success: true });
    // });
    // it('should handle login with incorrect password', async () => {
    //   // Mock the authService's getUserByEmail method to return a user
    //   authService.getUserByEmail = jest.fn().mockReturnValue({
    //     email: 'test@example.com',
    //     password: await hashPassword('testpassword'),
    //   });
    //   // Mock the validatePassword function to return false
    //   validatePassword = jest.fn().mockReturnValue(false);
    //   try {
    //     await authController.login({
    //       email: 'test@example.com',
    //       password: 'wrongpassword',
    //     });
    //   } catch (error) {
    //     expect(error).toBeInstanceOf(HttpException);
    //     expect(error.status).toBe(HttpStatus.FORBIDDEN);
    //   }
    // });
    // it('should handle login with user not found', async () => {
    //   // Mock the authService's getUserByEmail method to return null
    //   authService.getUserByEmail = jest.fn().mockReturnValue(null);
    //   try {
    //     await authController.login({
    //       email: 'nonexistent@example.com',
    //       password: 'testpassword',
    //     });
    //   } catch (error) {
    //     expect(error).toBeInstanceOf(HttpException);
    //     expect(error.status).toBe(HttpStatus.NOT_FOUND);
    //   }
    // });
  });
});
