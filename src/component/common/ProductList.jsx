import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";

const ProductList = ({ products }) => {
    const { cart, dispatch } = useCart();
    const navigate = useNavigate();

    const addToCart = async (product) => {
        if (!localStorage.getItem("token")) {
            alert("Please login to add items to your cart.");
            navigate("/login");
            return;
        }

        dispatch({ type: 'ADD_ITEM', payload: product });

        try {
            await ApiService.addToCart(product.id, 1);
        } catch (error) {
            console.error("Error adding item to cart in DB:", error);
        }
    };

    const incrementItem = async (product) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: product });
        try {
            await ApiService.addToCart(product.id, 1);
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    const decrementItem = async (product) => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch({ type: 'DECREMENT_ITEM', payload: product });
            try {
                await ApiService.addToCart(product.id, -1);
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

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 px-2 sm:px-6 py-4 mx-auto">
            {products.map((product, index) => {
                const cartItem = cart.find(item => item.id === product.id);
                return (
                    <div
                        key={index}
                        className="w-full h-[300px] sm:h-[350px] md:h-[400px] border border-[#e0e0e0] shadow-md overflow-hidden text-center transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 bg-white rounded"
                    >
                        <Link to={`/product/${product.id}`} className="text-inherit no-underline block">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-[120px] sm:h-[160px] md:h-[200px] w-full object-cover"
                            />
                            <h3 className="text-[#333] my-1 sm:my-2 text-sm sm:text-base md:text-lg font-semibold px-2">
                                {product.name}
                            </h3>

                            <p className="text-[#777] text-xs sm:text-sm mx-2 mb-1 sm:mb-2 h-[20px] overflow-hidden">
                                {product.description}
                            </p>

                            <span className="text-[#333] text-sm sm:text-base font-medium block mb-1 sm:mb-2">
                                ${product.price.toFixed(2)}
                            </span>
                        </Link>

                        {cartItem ? (
                            <div className="flex items-center justify-center mb-2 space-x-2 sm:space-x-3">
                                <button
                                    onClick={() => decrementItem(product)}
                                    className="bg-[#f68b1e] text-white text-sm sm:text-base rounded px-3 py-1 sm:px-4 sm:py-2 hover:bg-blue-600 transition"
                                >
                                    -
                                </button>
                                <span className="text-sm sm:text-base text-[#333]">{cartItem.quantity}</span>
                                <button
                                    onClick={() => incrementItem(product)}
                                    className="bg-[#f68b1e] text-white text-sm sm:text-base rounded px-3 py-1 sm:px-4 sm:py-2 hover:bg-blue-600 transition"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-[#f68b1e] text-white text-sm sm:text-base rounded px-4 py-1 sm:px-6 sm:py-2 mb-2 sm:mb-3 hover:bg-blue-600 transition"
                            >
                                Add To Cart
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;
