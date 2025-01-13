const ParkingController = require('../controllers/parkingController');
const Parking = require('../models/Parking');
const amqp = require('amqplib');

jest.mock('../models/Parking');
jest.mock('amqplib');

describe('Parking Controller Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = { body: {}, user: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('addParking', () => {
    it('should add a new parking session successfully', async () => {
      mockRequest.body = {
        parkplaceID: '1234',
        carRegistration: 'AB123CD',
        duration: 60,
        price: 10,
      };
      mockRequest.user = { email: 'test@example.com' };
      Parking.findOne.mockResolvedValue(null); // No existing parking
      Parking.prototype.save = jest.fn().mockResolvedValue(true);

      await ParkingController.addParking(mockRequest, mockResponse);

      expect(Parking.findOne).toHaveBeenCalledTimes(2); // Checking email and carRegistration
      expect(Parking.prototype.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'New parkig session created successfully' });
    });

    it('should not allow duplicate parking for the same email', async () => {
      mockRequest.body = { parkplaceID: '1234', carRegistration: 'AB123CD' };
      mockRequest.user = { email: 'test@example.com' };
      Parking.findOne.mockResolvedValue(true); // User is already parked

      await ParkingController.addParking(mockRequest, mockResponse);

      expect(Parking.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'This user is already parked somewhere' });
    });
  });

  describe('updateParking', () => {
    it('should update an existing parking session', async () => {
      mockRequest.body = { duration: 90 };
      mockRequest.user = { email: 'test@example.com' };
      const mockParking = { duration: 60, endTime: new Date(), save: jest.fn() };
      Parking.findOne.mockResolvedValue(mockParking);

      await ParkingController.updateParking(mockRequest, mockResponse);

      expect(Parking.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockParking.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Parking session updated successfully' });
    });

    it('should return an error if no parking session is found', async () => {
      mockRequest.body = { duration: 90 };
      mockRequest.user = { email: 'test@example.com' };
      Parking.findOne.mockResolvedValue(null);

      await ParkingController.updateParking(mockRequest, mockResponse);

      expect(Parking.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No parking session found for this email' });
    });
  });

  describe('getParking', () => {
    it('should retrieve an existing parking session', async () => {
      mockRequest.user = { email: 'test@example.com' };
      const mockParking = { parkplaceID: '1234', carRegistration: 'AB123CD' };
      Parking.findOne.mockResolvedValue(mockParking);

      await ParkingController.getParking(mockRequest, mockResponse);

      expect(Parking.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockParking);
    });

    it('should return an error if no parking session is found', async () => {
      mockRequest.user = { email: 'test@example.com' };
      Parking.findOne.mockResolvedValue(null);

      await ParkingController.getParking(mockRequest, mockResponse);

      expect(Parking.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No parking session found for this email' });
    });
  });

  describe('concludeParking', () => {
    it('should conclude an existing parking session', async () => {
      mockRequest.user = { email: 'test@example.com' };
      const mockParking = {
        _id: '5678',
        email: 'test@example.com',
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 60000),
        price: 10,
      };
      Parking.findOne.mockResolvedValue(mockParking);
      Parking.findOneAndDelete.mockResolvedValue(mockParking);
  
      await ParkingController.concludeParking(mockRequest, mockResponse);
  
      expect(Parking.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(Parking.findOneAndDelete).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Parking session deleted successfully',
        deletedParking: mockParking,
      });
    });
  
    it('should return an error if no parking session is found for conclusion', async () => {
      mockRequest.user = { email: 'test@example.com' };
      Parking.findOne.mockResolvedValue(null); // Simulate no parking session
    
      await ParkingController.concludeParking(mockRequest, mockResponse);
    
      expect(Parking.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Parking session not found' });
    });    
  });  
});
