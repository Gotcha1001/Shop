import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ShopContext } from '../../context/shop-context';

export const Product = (props) => {
    const { id, productName, price, productImage } = props.data;

    const { addToCart, cartItems } = useContext(ShopContext)

    const cartItemAmount = cartItems[id]

    return (
        <div className='product'>
            {/* Add hover animation */}
            <motion.img
                src={productImage}
                alt={productName}
                style={{ marginBottom: 40 }}
                whileHover={{ scale: 1.3 }} // Apply scale on hover
                transition={{ duration: 0.3 }} // Optional: Add a smooth transition
            />
            <div className='description'>
                <p><b>{productName}</b></p>
                <p>R {price}</p>
            </div>
            <motion.button whileHover={{ scale: 1.3 }}
                className='addToCartBttn mt-4'
                onClick={() => addToCart(id)}>
                Add To Cart
                {cartItemAmount > 0 && <>({cartItemAmount})</>}
            </motion.button>
        </div>
    );
};
