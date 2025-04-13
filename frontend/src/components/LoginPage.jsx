import { useState } from 'react';
import { login } from '../api.jsx';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: Invalid credentials or server error.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-xl mb-4 text-center">Login</h2>
                <input
                    type="email"
                    className="mb-4 p-2 border rounded w-full"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="mb-4 p-2 border rounded w-full"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded">
                    Login
                </button>
                <p className="mt-4 text-center text-sm">
                    Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
