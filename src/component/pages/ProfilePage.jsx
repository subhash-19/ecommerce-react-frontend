import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await ApiService.getLoggedInUserInfo();
            setUserInfo(response.user);
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Unable to fetch user info");
        }
    };

    if (!userInfo) {
        return <div className="text-center text-xl mt-10">Loading...</div>;
    }

    const handleAddressClick = () => {
        navigate(userInfo.address ? '/edit-address' : '/add-address');
    };

    const orderItemList = userInfo.orderItemList || [];
    const totalPages = Math.ceil(orderItemList.length / itemsPerPage);
    const paginatedOrders = orderItemList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        // ✨ Responsive padding and width
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-5xl mx-auto mt-10 ">
            <div className="bg-white shadow-md border border-orange-300 rounded-lg p-4 sm:p-6 md:p-8">
                <h2 className="text-center text-2xl sm:text-3xl font-extrabold mb-6">
                    Welcome {userInfo.name}
                </h2>

                {error ? (
                    <p className="text-red-600 text-center text-lg mt-4">{error}</p>
                ) : (
                    <div>
                        {/* User Info */}
                        <div className="text-base sm:text-lg mb-6">
                            <p className="mb-2"><strong className="text-orange-500">Name:</strong> {userInfo.name}</p>
                            <p className="mb-2"><strong className="text-orange-500">Email:</strong> {userInfo.email}</p>
                            <p className="mb-4"><strong className="text-orange-500">Phone Number:</strong> {userInfo.phoneNumber}</p>
                        </div>

                        {/* Address */}
                        <div className="mb-6">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-2">Address</h3>
                            {userInfo.address ? (
                                <div className="space-y-1 text-sm sm:text-base">
                                    <p><strong className="text-orange-500">Street:</strong> {userInfo.address.street}</p>
                                    <p><strong className="text-orange-500">City:</strong> {userInfo.address.city}</p>
                                    <p><strong className="text-orange-500">State:</strong> {userInfo.address.state}</p>
                                    <p><strong className="text-orange-500">Zip Code:</strong> {userInfo.address.zipCode}</p>
                                    <p><strong className="text-orange-500">Country:</strong> {userInfo.address.country}</p>
                                    <p><strong className="text-orange-500">Phone Number:</strong> {userInfo.address.phoneNumber}</p>
                                </div>
                            ) : (
                                <p>No Address information available.</p>
                            )}
                            {/* 📱 Responsive button */}
                            <button
                                className="bg-orange-500 text-white font-bold px-4 py-2 mt-4 rounded hover:bg-orange-800 transition w-full sm:w-auto"
                                onClick={handleAddressClick}
                            >
                                {userInfo.address ? "Edit Address" : "Add Address"}
                            </button>
                        </div>

                        {/* Orders */}
                        <h3 className="text-xl sm:text-2xl font-semibold mb-4">Order History</h3>
                        <ul className="flex flex-col gap-4 sm:gap-5">
                            {paginatedOrders.map(order => (
                                <li
                                    key={order.id}
                                    className="flex flex-col sm:flex-row items-center border border-gray-300 rounded-md p-4 hover:bg-gray-100 transition"
                                >
                                    {/* 📷 Responsive image */}
                                    <img
                                        src={order.product?.imageUrl || "/placeholder.png"}
                                        alt={order.product?.name || "Product"}
                                        className="w-24 h-24 object-cover rounded mb-4 sm:mb-0 sm:mr-6"
                                    />
                                    {/* 📦 Order Details */}
                                    <div className="flex-grow text-sm sm:text-base">
                                        <p className="mb-1"><strong className="text-orange-500">Name:</strong> {order.product?.name || "N/A"}</p>
                                        <p className="mb-1"><strong className="text-orange-500">Status:</strong> {order.status}</p>
                                        <p className="mb-1"><strong className="text-orange-500">Quantity:</strong> {order.quantity}</p>
                                        <p className="mb-1"><strong className="text-orange-500">Price:</strong> ₹{order.price?.toFixed(2) || "0.00"}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* 🔢 Pagination */}
                        <div className="flex justify-center mt-6 space-x-2 flex-wrap">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition ${currentPage === i + 1
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
