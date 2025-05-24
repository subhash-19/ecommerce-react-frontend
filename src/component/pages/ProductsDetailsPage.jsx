import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { cart, dispatch } = useCart();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ApiService.getProductById(productId);
                setProduct(response.product); // Adjust based on your API response
            } catch (error) {
                console.log(error.message || error);
            }
        };

        if (productId) fetchProduct();
    }, [productId]);

    const addToCart = async () => {
        if (!localStorage.getItem("token")) {
            alert("Please login to add items to your cart.");
            navigate("/login");
            return;
        }

        const isAlreadyInCart = cart.find(item => item.id === product.id);
        if (isAlreadyInCart) return; // prevent repeat

        dispatch({ type: "ADD_ITEM", payload: product });

        try {
            await ApiService.addToCart(product.id, 1);
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };
    

    const incrementItem = async () => {
        if (product) {
            dispatch({ type: "INCREMENT_ITEM", payload: product });
            try {
                await ApiService.addToCart(product.id, 1);
            } catch (error) {
                console.error("Error increasing quantity:", error);
            }
        }
    };

    const decrementItem = async () => {
        if (product) {
            const cartItem = cart.find((item) => item.id === product.id);
            if (cartItem && cartItem.quantity > 1) {
                dispatch({ type: "DECREMENT_ITEM", payload: product });
                try {
                    await ApiService.addToCart(product.id, -1); // decrease quantity
                } catch (error) {
                    console.error("Error decreasing quantity:", error);
                }
            } else {
                dispatch({ type: "REMOVE_ITEM", payload: product });
                try {
                    await ApiService.removeItemFromCart(product.id);
                } catch (error) {
                    console.error("Error removing item:", error);
                }
            }
        }
    };

    if (!product) {
        return <p>Loading product details ...</p>;
    }

    const cartItem = cart.find((item) => item.id === product.id);

    return (
        <div className="max-w-[350px] mx-auto my-40 p-4 border border-gray-300 rounded-lg flex flex-col items-center gap-4">
            <img
                src={product?.imageUrl || "/placeholder.jpg"}
                alt={product?.name}
                className="w-[350px] h-auto"
            />
            <h1 className="text-center text-lg font-semibold">{product?.name}</h1>
            <p>{product?.description}</p>
            <span className="block text-[20px] text-[#f68b1e]">${product.price.toFixed(2)}</span>

            {cartItem ? (
                <div className="flex items-center gap-2 w-full">
                    <button
                        onClick={() => decrementItem()}
                        className="w-full py-2 rounded-md bg-[#f68b1e] text-white text-base hover:bg-blue-600 cursor-pointer"
                    >
                        -
                    </button>
                    <span className="text-base font-medium">{cartItem.quantity}</span>
                    <button
                        onClick={() => incrementItem()}
                        className="w-full py-2 rounded-md bg-[#f68b1e] text-white text-base hover:bg-blue-600 cursor-pointer"
                    >
                        +
                    </button>
                </div>
            ) : (
                <button
                    onClick={addToCart}
                    className="w-full py-2 rounded-md bg-[#f68b1e] text-white text-base hover:bg-blue-600  cursor-pointer"
                >
                    Add To Cart
                </button>
            )}
        </div>
    );
};

export default ProductDetailsPage;
