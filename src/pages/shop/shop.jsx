import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { Product } from './product';
import './shop.css';

export const Shop = () => {
    const { products, loading, error } = useContext(ShopContext);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products: {error.message}</div>;

    return (
        <div className='shop'>
            <div className='shopTitle text-4xl font-extrabold'>
                <h1>WesleyTech Shop</h1>
            </div>
            <div className='products'>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product key={product.id} data={product} />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};
