const { getParkingSpaces } = require('../controllers/searchController');
const fetch = require('node-fetch');

jest.mock('node-fetch'); // Mock the fetch function

describe('getParkingSpaces', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = { body: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should return an error if latitude or longitude is missing', async () => {
    mockRequest.body = { lng: 13.4 }; // Missing lat
    await getParkingSpaces(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Latitude and Longitude are required' });
  });

  it('should handle Overpass API errors', async () => {
    mockRequest.body = { lat: 48.8566, lng: 2.3522, radius: 500 };

    // Simulate a failed fetch response
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await getParkingSpaces(mockRequest, mockResponse);

    expect(fetch).toHaveBeenCalledWith(
      'https://overpass-api.de/api/interpreter',
      expect.objectContaining({
        method: 'POST',
      })
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Failed to fetch data from Overpass API',
    });
  });

  it('should handle unexpected errors gracefully', async () => {
    mockRequest.body = { lat: 48.8566, lng: 2.3522, radius: 500 };

    // Simulate an unexpected error
    fetch.mockRejectedValueOnce(new Error('Network error'));

    await getParkingSpaces(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'An error occurred while fetching parking spaces',
    });
  });
});
