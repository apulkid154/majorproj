import React from 'react';
import { useCart } from './CartContext';

const CartPage = () => {
    const { cart, removeFromCart } = useCart();

    // Calculate the grand total
    const grandTotal = cart.reduce((total, item) => {
        return total + (item.pricePerKg * item.quantity);
    }, 0);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
            {cart.length > 0 ? (
                <div className="space-y-4">
                    {cart.map((item) => {
                        const totalAmount = item.pricePerKg * item.quantity;

                        return (
                            <div key={item._id} className="bg-white p-5 shadow-md rounded-lg flex justify-between items-center transition-transform transform hover:scale-105">
                                {/* Crop Image */}
                                <div className="w-1/6">
                                    {item.cropimage1 ? (
                                        <img
                                            src={item.cropimage1}
                                            alt={item.crop}
                                            className="w-full h-24 object-cover rounded-md"
                                        />
                                    ) : (
                                        <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Crop Details */}
                                <div className="w-2/6 pl-4">
                                    <h2 className="text-xl font-bold">{item.crop}</h2>
                                    <p className="text-gray-700">Quantity: {item.quantity} kg</p>
                                    <p className="text-gray-700">Price per kg: ₹{item.pricePerKg}</p>
                                </div>

                                {/* Total Amount */}
                                <div className="w-1/6 text-right">
                                    <p className="text-xl font-bold text-green-600">₹{totalAmount.toFixed(2)}</p>
                                    <p className="text-sm text-gray-600">Total</p>
                                </div>

                                {/* Remove Button */}
                                <div className="w-1/6">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-red-600"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-gray-600 text-center">Your cart is empty</p>
            )}

            {/* Grand Total */}
            {cart.length > 0 && (
                <div className="mt-6 flex justify-between items-center font-bold text-xl  text-gray-800">
                    <p>Grand Total:</p>
                    <p className="text-green-600">₹{grandTotal.toFixed(2)}</p>
                </div>
            )}

            {/* Proceed to Payment Button */}
            <div className="mt-8 flex justify-center">
                <button
                    className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-200 shadow-lg"
                    onClick={() => {
                        // Add your payment handling logic here
                        alert('Proceeding to payment...');
                    }}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default CartPage;
