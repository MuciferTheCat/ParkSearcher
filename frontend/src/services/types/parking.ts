export interface Coordinates {
  lat: number;
  lon: number;
}
export interface ParkingSpace {
  id: string;
  center: Coordinates;
  tags: Record<string, string>;
}

export interface ParkingSearchResponse {
  parkingSpaces: ParkingSpace[];
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

// export interface ParkingData {
//   parkplaceID: string;
//   carRegistration: string;
//   duration: number;
//   token: string;
// }

export interface Parking {
  parkplaceID: string;
  carRegistration: string;
  duration: number;
  endTime: string;
  startTime: string;
}