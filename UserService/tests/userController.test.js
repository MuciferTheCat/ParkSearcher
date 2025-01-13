const UserController = require('../controllers/userController');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

jest.mock('../models/User');
jest.mock('jsonwebtoken');

describe('User Controller Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = { body: {}, user: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      mockRequest.body = { username: 'testUser', email: 'test@example.com', password: 'password123' };
      User.findOne.mockResolvedValue(null); // No existing user
      User.prototype.save = jest.fn().mockResolvedValue(true); // Simulate saving user

      await UserController.registerUser(mockRequest, mockResponse);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(User.prototype.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
    });
  });

  describe('loginUser', () => {
    it('should login a user successfully', async () => {
      mockRequest.body = { email: 'test@example.com', password: 'password123' };
      const mockUser = {
        comparePassword: jest.fn().mockResolvedValue(true),
        _id: '123',
        email: 'test@example.com',
        username: 'testUser',
      };
      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mockToken');

      await UserController.loginUser(mockRequest, mockResponse);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockUser.comparePassword).toHaveBeenCalledWith('password123');
      expect(mockResponse.cookie).toHaveBeenCalledWith('jwt', 'mockToken', expect.any(Object));
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Login successful',
        email: 'test@example.com',
        username: 'testUser',
      });
    });
  });

  describe('makeAdmin', () => {
    it('should make a user an admin successfully', async () => {
      mockRequest.body = { email: 'user@example.com' };
      mockRequest.user = { email: 'admin@example.com' };
      const adminUser = { isAdmin: true };
      const targetUser = { save: jest.fn(), isAdmin: false };

      User.findOne.mockImplementation((query) => {
        if (query.email === 'admin@example.com') return Promise.resolve(adminUser);
        if (query.email === 'user@example.com') return Promise.resolve(targetUser);
        return Promise.resolve(null);
      });

      await UserController.makeAdmin(mockRequest, mockResponse);

      expect(targetUser.isAdmin).toBe(true);
      expect(targetUser.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User successfully made into an admin' });
    });
  });
});
