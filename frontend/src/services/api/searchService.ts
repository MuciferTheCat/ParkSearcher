// src/services/api/searchService.ts

export interface ParkingSpace {
    id: string;
    center: { lat: number; lon: number };
    tags: Record<string, string>;
}

export const getParkingSpaces = async (lat: number, lng: number, radius: number = 500) => {
    const baseUrl = 'http://localhost:5003/api/search/find';
    const queryParams = `?lat=${lat}&lng=${lng}&radius=${radius}`;

    try {
        const response = await fetch(`${baseUrl}${queryParams}`);
        if (!response.ok) {
            throw new Error('Failed to fetch parking spaces');
        }
        const data = await response.json();
        return data.parkingSpaces;
    } catch (error) {
        console.error('Error fetching parking spaces:', error);
        throw error;
    }
};