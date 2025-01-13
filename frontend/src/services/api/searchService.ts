import { ParkingSpace } from "../types/search";

const SEARCH_SERVICE_URL = import.meta.env.VITE_SEARCH_SERVICE_URL;
const GEOLOCATION_SERVICE_URL = import.meta.env.VITE_GEOLOCATION_SERVICE_URL;

export const getParkingSpaces = async (
  lat: number,
  lng: number,
  radius: number = 500,
  useGeolocation: boolean = false
): Promise<ParkingSpace[]> => {
  const url = useGeolocation ? GEOLOCATION_SERVICE_URL : SEARCH_SERVICE_URL;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat,
        lng,
        radius,
      }),
    });

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