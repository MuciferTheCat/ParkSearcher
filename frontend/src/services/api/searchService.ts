export interface ParkingSpace {
    id: string;
    center: { lat: number; lon: number };
    tags: Record<string, string>;
}

export const getParkingSpaces = async (
    lat: number,
    lng: number,
    radius: number = 500
): Promise<ParkingSpace[]> => {
    const baseUrl = 'http://localhost:5000/api/parking';
    const queryParams = `?lat=${lat}&lng=${lng}&radius=${radius}`;

    const response = await fetch(`${baseUrl}${queryParams}`);
    if (!response.ok) {
        throw new Error('Failed to fetch parking spaces');
    }
    const data = await response.json();
    return data.parkingSpaces;
};
