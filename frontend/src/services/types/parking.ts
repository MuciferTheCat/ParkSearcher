// src/services/types/parking.ts

/**
 * Represents the coordinates of a parking space's center.
 */
export interface Coordinates {
    lat: number;
    lon: number;
}

/**
 * Represents a parking space with relevant details.
 */
export interface ParkingSpace {
    id: string;               // Unique identifier for the parking space
    center: Coordinates;      // Geographical center of the parking space
    tags: Record<string, string>; // Additional information about the parking space
}

/**
 * Represents the response from the parking search API.
 */
export interface ParkingSearchResponse {
    parkingSpaces: ParkingSpace[]; // Array of parking spaces returned by the API
}
