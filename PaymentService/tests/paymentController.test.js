const PaymentController = require('../controllers/paymentController');
const Payment = require('../models/Payment');

jest.mock('../models/Payment');

describe('Payment Controller Tests', () => {
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

  describe('addPayment', () => {
    it('should add a new payment successfully', async () => {
      mockRequest.body = { amount: 100 };
      mockRequest.user = { email: 'test@example.com' };
      Payment.prototype.save = jest.fn().mockResolvedValue(true);

      await PaymentController.addPayment(mockRequest, mockResponse);

      expect(Payment.prototype.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'New payment created successfully' });
    });

    it('should create an inactive payment if amount is 0', async () => {
      mockRequest.body = { amount: 0 };
      mockRequest.user = { email: 'test@example.com' };
      Payment.prototype.save = jest.fn().mockResolvedValue(true);

      await PaymentController.addPayment(mockRequest, mockResponse);

      expect(Payment.prototype.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'New payment created successfully' });
    });

    it('should handle server errors', async () => {
      mockRequest.body = { amount: 100 };
      mockRequest.user = { email: 'test@example.com' };
      Payment.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

      await PaymentController.addPayment(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server error:', error: expect.any(Error) });
    });
  });

  describe('deactivatePayment', () => {
    it('should deactivate a payment successfully', async () => {
      mockRequest.body = { id: 'payment123' };
      const mockPayment = { isActive: true, save: jest.fn() };
      Payment.findById.mockResolvedValue(mockPayment);

      await PaymentController.deactivatePayment(mockRequest, mockResponse);

      expect(Payment.findById).toHaveBeenCalledWith('payment123');
      expect(mockPayment.isActive).toBe(false);
      expect(mockPayment.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Payment settled successfully' });
    });

    it('should return an error if payment ID is not found', async () => {
      mockRequest.body = { id: 'invalidId' };
      Payment.findById.mockResolvedValue(null);

      await PaymentController.deactivatePayment(mockRequest, mockResponse);

      expect(Payment.findById).toHaveBeenCalledWith('invalidId');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No payment with this id' });
    });

    it('should return an error if payment is already inactive', async () => {
      mockRequest.body = { id: 'payment123' };
      const mockPayment = { isActive: false };
      Payment.findById.mockResolvedValue(mockPayment);

      await PaymentController.deactivatePayment(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'This payment is already settled' });
    });
  });

  describe('getPayments', () => {
    it('should return a list of payments for the user', async () => {
      mockRequest.user = { email: 'test@example.com' };
      const mockPayments = [
        { email: 'test@example.com', amount: 100 },
        { email: 'test@example.com', amount: 200 },
      ];
      Payment.find.mockResolvedValue(mockPayments);

      await PaymentController.getPayments(mockRequest, mockResponse);

      expect(Payment.find).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPayments);
    });

    it('should return an error if no payments are found', async () => {
      mockRequest.user = { email: 'test@example.com' };
      Payment.find.mockResolvedValue(null);

      await PaymentController.getPayments(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No payments found for this email' });
    });
  });

  describe('getPaymentById', () => {
    it('should return payment details by ID', async () => {
      mockRequest.body = { id: 'payment123' };
      const mockPayment = { id: 'payment123', amount: 100, isActive: true };
      Payment.findById.mockResolvedValue(mockPayment);

      await PaymentController.getPaymentById(mockRequest, mockResponse);

      expect(Payment.findById).toHaveBeenCalledWith('payment123');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPayment);
    });

    it('should return an error if payment ID is not found', async () => {
      mockRequest.body = { id: 'invalidId' };
      Payment.findById.mockResolvedValue(null);

      await PaymentController.getPaymentById(mockRequest, mockResponse);

      expect(Payment.findById).toHaveBeenCalledWith('invalidId');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No payment with this id' });
    });
  });
});
