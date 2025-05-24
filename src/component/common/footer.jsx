import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
                {/* Navigation Links */}
                <ul className="flex flex-wrap justify-center gap-6 list-none m-0 p-0 text-center">
                    <li>
                        <NavLink
                            to="/"
                            className="text-white no-underline hover:underline font-medium"
                        >
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            className="text-white no-underline hover:underline font-medium"
                        >
                            Contact Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            className="text-white no-underline hover:underline font-medium"
                        >
                            Terms & Conditions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            className="text-white no-underline hover:underline font-medium"
                        >
                            Privacy Policy
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            className="text-white no-underline hover:underline font-medium"
                        >
                            FAQs
                        </NavLink>
                    </li>
                </ul>

                {/* Copyright */}
                <div className="text-sm text-center text-white">
                    &copy; 2025 Code Master.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
