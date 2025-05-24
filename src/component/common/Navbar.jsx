import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext"; // ✅ Import CartContext

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated();

    const { cart } = useCart(); // ✅ Get cart from context

    // ✅ Calculate total number of Products
    const totalProducts = cart.length;

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/?search=${searchValue}`);
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            ApiService.logout();
            setTimeout(() => navigate("/login"), 500);
        }
    };

    return (
        <nav className="bg-[#f68b1e] text-white p-4 shadow-md">
            <div className="max-w-7xl sm:mx-[5px] md:mx-[10px] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Row 1: Logo + Search Box + Search Icon */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">

                    {/* Left 60% (Logo + Search) */}
                    <div className="w-full md:w-[60%] flex items-center gap-4">
                        {/* Logo */}
                        <NavLink to="/">
                            <img src="/furniture-logo.png" alt="Furniture-logo" className="h-10" />
                        </NavLink>

                        {/* Search Form */}
                        <form
                            onSubmit={handleSearchSubmit}
                            className="w-full md:max-w-xl lg:max-w-2xl md:ml-[50px] lg:ml-[100px]"
                        >
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search products"
                                className="w-full p-2 rounded text-black outline-none"
                            />
                        </form>

                        {/* Search Button */}
                        <button
                            onClick={handleSearchSubmit}
                            className="p-2 bg-white rounded text-orange-500 hover:bg-gray-100"
                        >
                            <Search />
                        </button>
                    </div>

                    {/* Right 40% (Navigation Links) */}
                    <div className="w-full md:w-[40%] flex flex-wrap md:justify-end justify-evenly items-center gap-4 text-sm font-medium">
                        <NavLink to="/" className="hover:underline">Home</NavLink>
                        <NavLink to="/categories" className="hover:underline">Category</NavLink>

                        {/* ✅ Cart link with badge */}
                        <NavLink to="/cart" className="relative hover:underline flex items-center">
                            <ShoppingCart className="mr-1" />
                            Cart
                            {totalProducts > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalProducts}
                                </span>
                            )}
                        </NavLink>

                        {isAuthenticated && (
                            <NavLink to="/profile" className="hover:underline">My Account</NavLink>
                        )}
                        {isAdmin && (
                            <NavLink to="/admin" className="hover:underline">Admin</NavLink>
                        )}
                        {!isAuthenticated ? (
                            <NavLink to="/login" className="hover:underline">Login</NavLink>
                        ) : (
                            <button onClick={handleLogout} className="hover:underline">Logout</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
