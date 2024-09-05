import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import './cart.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartItem from '../../pages/cart/cart-item';

export const Cart = () => {
    const { cartItems, getTotalCartAmount, products } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();

    // Get current user from Firebase Authentication
    const auth = getAuth();
    const user = auth.currentUser;

    const handleCheckout = async () => {
        if (!user || !user.email) {
            alert('User email not found. Please log in.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/checkout/initiate', {
                amount: totalAmount,
                description: 'Your purchase from WesleyTech Shop',
                email: user.email, // Use the user's email
                name: user.displayName || 'John Doe' // Use user's name if available
            });
            if (response.data && response.data.payment_url) {
                window.location.href = response.data.payment_url; // Redirect to PayFast
            } else {
                console.error('Payment URL is undefined');
                alert('Failed to retrieve payment URL. Please try again.');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('An error occurred during checkout. Please try again.');
        }
    };

    return (
        <div className='cart'>
            <div><h1 className='text-4xl zoom font-extrabold'>Your Cart Items</h1></div>
            <div className='cartItems'>
                {products.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return <CartItem key={product.id} data={product} />;
                    }
                    return null;
                })}
            </div>
            {totalAmount > 0 ?
                <div className='checkout'>
                    <p className='mb-4'>Subtotal: R {totalAmount}</p>
                    <button onClick={() => navigate('/')} className='cart-button'>Continue Shopping</button>
                    <button onClick={handleCheckout} className='cart-button'>Checkout</button>
                </div>
                : <h1 className='mt-4'>Your Cart Is Empty</h1>
            }
        </div>
    );
};
