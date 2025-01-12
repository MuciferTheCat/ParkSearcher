import axios from "axios";
import { Payment } from "../types/payment";

const API_BASE_URL = import.meta.env.VITE_PAYMENT_SERVICE_URL;

export const fetchPayments = async (token: string): Promise<Payment[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.map((payment: any) => ({
      id: payment._id,
      email: payment.email,
      amount: payment.amount,
      date: payment.date,
      isActive: payment.isActive,
    }));
  } catch (error: any) {
    console.error("Error fetching payments:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch payments."
    );
  }
};
