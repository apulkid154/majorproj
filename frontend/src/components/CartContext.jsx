// CartContext.js
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (crop, quantity) => {
        const existingCrop = cart.find(item => item._id === crop._id);

        if (existingCrop) {
            // Update quantity for existing crop
            setCart(prevCart => 
                prevCart.map(item => 
                    item._id === crop._id ? { ...item, quantity: item.quantity + quantity } : item
                )
            );
            toast.success(`Updated ${crop.crop} quantity!`);
        } else {
            // Add new crop to cart
            setCart((prevCart) => [...prevCart, { ...crop, quantity }]);
            toast.success(`${crop.crop} added to cart!`);
        }
    };

    const removeFromCart = (cropId) => {
        setCart((prevCart) => prevCart.filter(item => item._id !== cropId));
        toast.error('Crop removed from cart');
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};