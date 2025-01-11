import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api/userService';
import { LoginData, AuthResponse } from '../services/types/user';

interface LoginProps {
    onLogin: (token: string, username: string, email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response: AuthResponse = await loginUser(formData);
            onLogin(response.jwtoken, response.username, response.email);
            setError(null);
            navigate('/'); // Redirect to home
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
            <div className="bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center">Login</h2>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control mb-3"
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-control mb-3"
                    />
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
