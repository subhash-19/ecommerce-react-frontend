import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div className="mt-10 sm:mt-40 flex flex-col items-center px-4">
            <h1 className="mb-5 text-2xl sm:text-3xl md:text-4xl font-bold">Welcome Admin</h1>

            <button
                onClick={() => navigate("/admin/categories")}
                className="my-2 px-4 py-4 text-lg sm:text-xl font-bold rounded-md border-none cursor-pointer bg-orange-500 hover:bg-orange-700 text-white w-full sm:w-2/3 md:w-1/2 lg:w-1/3"
            >
                Manage Categories
            </button>

            <button
                onClick={() => navigate("/admin/products")}
                className="my-2 px-4 py-4 text-lg sm:text-xl font-bold rounded-md border-none cursor-pointer bg-orange-500 hover:bg-orange-700 text-white w-full sm:w-2/3 md:w-1/2 lg:w-1/3"
            >
                Manage Products
            </button>

            <button
                onClick={() => navigate("/admin/orders")}
                className="my-2 px-4 py-4 text-lg sm:text-xl font-bold rounded-md border-none cursor-pointer bg-orange-500 hover:bg-orange-700 text-white w-full sm:w-2/3 md:w-1/2 lg:w-1/3"
            >
                Manage Orders
            </button>
        </div>
    );
};

export default AdminPage;
