import { ParkingSpace } from "../types/search";

const API_BASE_URL = import.meta.env.VITE_SEARCH_SERVICE_URL;

export const getParkingSpaces = async (
  lat: number,
  lng: number,
  radius: number = 500
): Promise<ParkingSpace[]> => {
  const response = await fetch(`${API_BASE_URL}/find`, {
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
  const data = await response.json();
  return data.parkingSpaces;
};
