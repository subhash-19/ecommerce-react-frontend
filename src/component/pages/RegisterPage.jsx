import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phoneNumber: '',
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
            const response = await ApiService.registerUser(formData);
            if (response.status === 200) {
                setMessage("User Successfully Registered");
                setTimeout(() => {
                    navigate("/login");
                }, 4000);
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "Unable to register a user");
        }
    };

    return (
        <div className="bg-gray-50 px-4 py-8 sm:min-h-screen sm:flex sm:items-center sm:justify-center">
            <div className="w-full max-w-md bg-white border border-orange-300 rounded-xl shadow-md p-6 mx-auto">
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

                    <label htmlFor="name" className="mb-1 font-medium">Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mb-4 px-3 py-2 border border-gray-300 rounded"
                    />

                    <label htmlFor="phoneNumber" className="mb-1 font-medium">Phone Number:</label>
                    <input
                        id="phoneNumber"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
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
                        Register
                    </button>

                    <p className="mt-4 text-sm text-center">
                        Already have an account? <a href="/login" className="text-[#f68b1e] underline">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
