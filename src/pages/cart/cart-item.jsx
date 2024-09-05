import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import './cart.css';
import { motion } from 'framer-motion';

const CartItem = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

    return (
        <div className='cartItem'>
            <motion.img whileHover={{ scale: 1.2 }} src={productImage} alt={productName} />
            <div className='description'>
                <p><b>{productName}</b></p>
                <p>R {price}</p>
                <div className='countHandler'>
                    <motion.button whileTap={{ scale: 1.4 }} className="cart-button" onClick={() => removeFromCart(id)}> - </motion.button>
                    <input
                        value={cartItems[id]}
                        onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
                        style={{ width: '90px' }}
                    />
                    <motion.button whileTap={{ scale: 1.4 }} className="cart-button" onClick={() => addToCart(id)}> + </motion.button>
                </div>
            </div>
        </div>
    );
};

export default CartItem; // Default export
