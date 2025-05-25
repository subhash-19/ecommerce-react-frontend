import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";

const AddressPage = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/edit-address') {
            fetchUserInfo();
        }
    }, [location.pathname]);

    const fetchUserInfo = async () => {
        try {
            const response = await ApiService.getLoggedInUserInfo();
            if (response.user.address) {
                setAddress(response.user.address);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch user information');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService.saveAddress(address);
            navigate("/profile");
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Failed to save/update address');
        }
    };

    return (
        //  Responsive width & padding for different screen sizes
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 max-w-2xl mx-auto mt-8">
            <div className="bg-gray-100 shadow-md border border-orange-300 rounded-lg p-4 sm:p-6 md:p-8">
                {/*  Responsive heading size */}
                <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-5">
                    {location.pathname === '/edit-address' ? 'Edit Address' : 'Add Address'}
                </h2>

                {/*  Responsive error text */}
                {error && <p className="text-red-600 text-center mb-5 text-sm sm:text-base">{error}</p>}

                <form onSubmit={handSubmit} className="flex flex-col space-y-4">
                    {[
                        { label: "Street", name: "street" },
                        { label: "City", name: "city" },
                        { label: "State", name: "state" },
                        { label: "Zip Code", name: "zipCode" },
                        { label: "Country", name: "country" },
                        { label: "Phone Number", name: "phoneNumber" },
                    ].map(({ label, name }) => (
                        <div key={name}>
                            {/* Responsive label text */}
                            <label htmlFor={name} className="block font-medium text-sm sm:text-base mb-1">{label}:</label>
                            <input
                                type="text"
                                name={name}
                                value={address[name]}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                            />
                        </div>
                    ))}

                    {/*  Full width on small screens, auto on medium+ */}
                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                        {location.pathname === '/edit-address' ? 'Edit Address' : 'Save Address'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddressPage;
