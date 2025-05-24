import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.loginUser(formData);
            if (response.status === 200) {
                setMessage("User Successfully Loged in");
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                setTimeout(() => {
                    navigate("/profile");
                }, 4000);
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "Unable to login a user");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-xl shadow-md bg-white">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

            {message && <p className="text-center text-green-600 mb-4">{message}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-medium">Email:</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mb-4 px-3 py-2 border border-gray-300 rounded"
                />

                <label htmlFor="password" className="mb-1 font-medium">Password:</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mb-4 px-3 py-2 border border-gray-300 rounded"
                />

                <button
                    type="submit"
                    className="py-2 px-4 rounded bg-[#f68b1e] text-white font-bold text-lg hover:bg-[#81480e] transition-colors"
                >
                    Login
                </button>

                <p className="mt-4 text-sm text-center">
                    Don't have an account? <a href="/register" className="text-[#f68b1e] underline">Register</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
