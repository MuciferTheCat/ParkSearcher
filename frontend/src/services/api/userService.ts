import axios from 'axios';
import { RegisterData, LoginData, User, AuthResponse } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_USER_SERVICE_URL;

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
    console.log(data)
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
};

export const getUserProfile = async (id: string, token: string): Promise<User> => {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};