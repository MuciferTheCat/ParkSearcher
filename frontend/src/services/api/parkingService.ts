import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_PARKING_SERVICE_URL;

export const createParking = async (
  parkplaceID: string,
  carRegistration: string,
  duration: number,
  token: string
) => {
  const response = await axios.post(`${API_BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({
      parkplaceID,
      carRegistration,
      duration,
    }),
  });
  return response.data;
};
