import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.loginUser(formData);
            if (response.status === 200) {
                setMessage("User Successfully Logged in");
                localStorage.setItem("token", response.token);
                localStorage.setItem("role", response.role);
                setTimeout(() => {
                    navigate("/profile");
                }, 4000);
            }
        } catch (error) {
            setMessage(
                error.response?.data.message || error.message || "Unable to login a user"
            );
        }
    };

    return (
        <div className="bg-gray-50 px-4 py-8 sm:min-h-screen sm:flex sm:items-center sm:justify-center">
            <div className="w-full max-w-md bg-white border border-orange-300 rounded-xl shadow-md p-6 mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Login</h2>

                {message && (
                    <p
                        className={`text-center mb-6 ${message.toLowerCase().includes("success")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="mb-1 font-medium text-sm sm:text-base"
                    >
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mb-6 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
                    />

                    <label
                        htmlFor="password"
                        className="mb-1 font-medium text-sm sm:text-base"
                    >
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mb-6 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded bg-[#f68b1e] text-white font-bold text-lg hover:bg-[#81480e] transition-colors"
                    >
                        Login
                    </button>

                    <p className="mt-6 text-sm sm:text-base text-center">
                        Don&apos;t have an account?{" "}
                        <a href="/register" className="text-[#f68b1e] underline">
                            Register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
