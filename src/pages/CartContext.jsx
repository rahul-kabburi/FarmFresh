import React, { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });

    //Sync cart to Local Storage whenever the cart data changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    //Add Item to cart or increase the quantity of an Existing item
    const addToCart = (item, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((ci) => ci.id === item.id);
            if (existingItem) {
                return prevCart.map((ci) =>
                    ci.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
                );
            } else {
                return [...prevCart, { ...item, quantity }];
            }
        });
    };

    //Remove from cart
    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((ci) => ci.id !== itemId));
    };

    //Update item quantity
    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart((prevCart) => {
            prevCart.map((ci) =>
                ci.id === itemId ? { ...ci, quantity: newQuantity } : ci
            );
            return prevCart.map((ci) =>
                ci.id === itemId ? { ...ci, quantity: newQuantity } : ci
            );
        });
    };

    //Clear Cart
    const clearCart = () => {
        setCart([]);
    };

    //Calculate total cost
    const getCartTotal = () =>
        cart.reduce((total, ci) => total + ci.price * ci.quantity, 0);

    //calculate total number of items in cart
    const cartCount = cart.reduce((count, ci) => count + ci.quantity, 0);

    return (
        <cartContext.Provider
            value={{
                cart,
                cartCount,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
            }}
        >
            {" "}
            {children}{" "}
        </cartContext.Provider>
    );
};

//custom hook for cart context
export const useCart = () => {
    const context = useContext(cartContext);
    if (!context) {
        throw new Error("USECART MUST BE USED WITHIN A CART PROVIDER");
    }
    return context;
};
