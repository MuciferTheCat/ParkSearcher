import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api/userService';
import { RegisterData } from '../services/types/user';

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
            navigate(`/profile/${response.user.id}`);
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
            <div className="bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center">Register</h2>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="form-control mb-3"
                    />
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
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
