import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";

const CartPage = () => {
    const { cart, dispatch } = useCart();
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const incrementItem = async (product) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: product });
        try {
            await ApiService.addToCart(product.id, 1); // product.id is correct
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    const decrementItem = async (product) => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch({ type: 'DECREMENT_ITEM', payload: product });
            try {
                await ApiService.addToCart(product.id, -1); // decrease quantity
            } catch (error) {
                console.error("Error decreasing quantity:", error);
            }
        } else {
            dispatch({ type: 'REMOVE_ITEM', payload: product });
            try {
                await ApiService.removeItemFromCart(product.id);
            } catch (error) {
                console.error("Error removing item:", error);
            }
        }
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (!ApiService.isAuthenticated()) {
            setMessage("Please log in to place an order.");
            setTimeout(() => {
                setMessage('');
                navigate("/login");
            }, 3000);
            return;
        }

        const orderItems = cart.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        const orderRequest = {
            totalPrice,
            items: orderItems,
        };

        try {
            const response = await ApiService.createOrder(orderRequest);
            setMessage(response.message);

            if (response.status === 200) {
                dispatch({ type: 'CLEAR_CART' });
                await ApiService.clearCart(); // Optional: clear backend cart
            }

        } catch (error) {
            setMessage(error.response?.message || error.message || 'Failed to place an order');
            setTimeout(() => {
                setMessage('');
                navigate("/login");
            }, 3000);
        }
    };

    return (
        <div className="max-w-[1000px] mx-auto mb-40 p-5 text-[#444]">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>
            {message && <p className="text-[#f68b1e] text-2xl font-bold text-center">{message}</p>}

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul className="list-none p-0">
                        {cart.map(item => (
                            <li key={item.id} className="border border-gray-300 rounded-md mb-5 p-3 flex items-center">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md mr-5"
                                />
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-sm text-gray-600">{item.description}</p>

                                    <div className="flex items-center gap-2 w-full mt-2">
                                        <button
                                            onClick={() => decrementItem(item)}
                                            className="bg-[#f68b1e] hover:bg-[#93500d] text-white text-xl font-medium py-1 px-3 rounded cursor-pointer"
                                        >
                                            -
                                        </button>
                                        <span className="text-base font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => incrementItem(item)}
                                            className="bg-[#f68b1e] hover:bg-[#93500d] text-white text-xl font-medium py-1 px-3 rounded cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="block mt-2 font-medium">${item.price.toFixed(2)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-xl font-bold mt-4">
                        Total: ${new Intl.NumberFormat('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(totalPrice)}
                    </h2>

                    <button
                        onClick={handleCheckout}
                        className="bg-[#f68b1e] hover:bg-[#93500d] text-white text-lg font-medium rounded-md px-6 py-5 block w-[99%] mx-auto mt-5 transition-colors duration-300"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
