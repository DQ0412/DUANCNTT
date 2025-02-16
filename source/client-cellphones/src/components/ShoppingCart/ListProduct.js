import React from 'react';
import Product from './Product';

function ListProduct({ products, onDecrease, onIncrease }) {
    return (
        <div className="shopping-cart-list">
            {products.map((product, index) => (
                <Product 
                    key={index} 
                    product={product} 
                    onDecrease={onDecrease} 
                    onIncrease={onIncrease} 
                />
            ))}
        </div>
    );
}

export default ListProduct;
