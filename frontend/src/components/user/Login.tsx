import React, { useState } from 'react';
import { loginUser } from '../../services/api/userService';
import { LoginData, AuthResponse } from '../../services/types/user';

interface LoginProps {
    onLogin: (token: string, userId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response: AuthResponse = await loginUser(formData);
            onLogin(response.token, response.user.id);
            setError(null);
            // Navigate to profile (if using a router library with history)
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
