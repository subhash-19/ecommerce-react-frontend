import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const CategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Added an array of Tailwind background color classes
    const colors = [
        "bg-red-100", "bg-red-200", "bg-red-300", "bg-orange-100", "bg-orange-200",
        "bg-orange-300", "bg-amber-100", "bg-amber-200", "bg-amber-300", "bg-yellow-100",
        "bg-yellow-200", "bg-yellow-300", "bg-lime-100", "bg-lime-200", "bg-lime-300",
        "bg-green-100", "bg-green-200", "bg-green-300", "bg-teal-100", "bg-teal-200",
        "bg-teal-300", "bg-cyan-100", "bg-cyan-200", "bg-cyan-300", "bg-blue-100",
        "bg-blue-200", "bg-blue-300", "bg-purple-100", "bg-purple-200", "bg-purple-300"
    ];

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await ApiService.GetAllCategory();
            setCategories(response.categoryList || []);
        } catch (error) {
            setError(error.response?.message || error.message || 'Unable to fetch categories');
        }
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div className="max-w-[1000px] mx-auto mb-20 p-5 text-[#444]">
            <h1 className="text-2xl font-bold mb-6 text-center">Categories</h1>
            {error ? (
                <p className="text-red-600 text-center text-lg mt-5">{error}</p>
            ) : (
                <ul className="list-none p-0 grid grid-cols-1 gap-6">
                    {categories.map((category, index) => (
                        <li key={category.id}>
                            <button
                                onClick={() => handleCategoryClick(category.id)}
                                // ✅ Added dynamic background color from the colors array based on index
                                className={`w-full text-left border border-gray-900 rounded-md p-4 flex items-center hover:shadow-md hover:bg-blue-800 hover:text-white transition-shadow outline-none focus:ring-2 focus:ring-[#f68b1e] ${colors[index % colors.length]}`}
                            >
                                <img
                                    src={category.imageUrl || "/placeholder-image.png"}
                                    alt={category.name}
                                    className="w-20 h-20 object-cover rounded-md mr-5"
                                />
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold capitalize">{category.name}</h2>
                                    <span className="mt-2 inline-block bg-[#f68b1e] text-white text-sm font-medium py-2 px-4 rounded">
                                        View
                                    </span>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoryListPage;
