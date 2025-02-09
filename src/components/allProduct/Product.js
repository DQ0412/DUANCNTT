import React from 'react';
import { formatPrice } from '../../untils/index';

function Product({ product }) {

    return (
        <div className="hotsale-listproduct-product">
            <a href={"/detail/" + product.id}>
                <img src={`http://127.0.0.1:8000/storage/${product.image}`} alt={product.name} />
                <p className="hotsale-listproduct-product-name">{product.name}</p>
                <div className="price">
                    <span className="price1">{formatPrice(product.sale_price)}đ</span>
                    <span className="price2">{formatPrice(product.price)}đ</span>
                </div>
            </a>
            <div className="buy">
                <a href="/cart"> Mua Ngay</a>
            </div>
        </div>
    );
}

export default Product;
