export interface Coordinates {
  lat: number;
  lon: number;
}
export interface ParkingSpace {
  id: string; // Unique identifier for the parking space
  center: Coordinates; // Geographical center of the parking space
  tags: Record<string, string>; // Additional information about the parking space
}

export interface ParkingSearchResponse {
  parkingSpaces: ParkingSpace[]; // Array of parking spaces returned by the API
}

export interface ParkingDetails {
  id: string;
  tags: {
    name?: string;
    access?: string;
    amenity?: string;
    fee?: string;
    parking?: string;
    capacity?: string;
    "addr:city"?: string;
    "addr:street"?: string;
  };
}

export interface ParkingProps {
  isLoggedIn: boolean;
  token: string;
}

export interface ParkingData {
  parkplaceID: string;
  carRegistration: string;
  duration: number;
  token: string;
}
