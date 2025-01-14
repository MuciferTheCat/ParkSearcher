import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_PARKING_SERVICE_URL;

export const createParking = async (parkplaceID: string, carRegistration: string, duration: number, token: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`,
      {
        parkplaceID,
        carRegistration,
        duration,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create parking session.");
  }
};

export const endActiveParking = async (token: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/end`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error("Error ending parking:", error);
    throw new Error(
      error.response?.data?.message || "Failed to end parking session."
    );
  }
};

export const updateParkingDuration = async (
  token: string,
  data: { duration: number }
): Promise<any> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error updating parking duration:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update parking duration."
    );
  }
};

export const getActiveParking = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/parking/get`, {
      withCredentials: true
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch active parking");
  }
};
