// src/components/user/Register.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api/userService';
import { RegisterData } from '../../services/types/user';

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterData>({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            // Redirect to the profile page with the user ID
            navigate(`/profile/${response.user.id}`);
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>Name:</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
