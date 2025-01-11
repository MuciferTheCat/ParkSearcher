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
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Login</h2>
            {error && <p style={styles.error}>{error}</p>}
            <label style={styles.label}>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
            />
            <label style={styles.label}>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
            />
            <button type="submit" style={styles.button}>
                Login
            </button>
        </form>
    );
};

const styles = {
    form: {
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        fontSize: '1rem',
        marginBottom: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        backgroundColor: '#8F95D3',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    error: {
        color: 'red',
        marginBottom: '1rem',
    },
};

export default Login;
