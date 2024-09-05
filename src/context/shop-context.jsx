import React, { createContext, useState, useEffect } from 'react';
import { db } from '../Firebaseconfig/firebase'; // Ensure this path is correct
import { collection, getDocs } from 'firebase/firestore';

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
    let cart = {};
    products.forEach(product => {
        cart[product.id] = 0;
    });
    return cart;
};

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'cart'));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productsData);
                setCartItems(getDefaultCart(productsData)); // Initialize cart with fetched products
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        products.forEach(product => {
            if (cartItems[product.id] > 0) {
                totalAmount += cartItems[product.id] * product.price;
            }
        });
        return totalAmount;
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
    };

    const contextValue = {
        cartItems,
        products,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getTotalCartAmount
    };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
