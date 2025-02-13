import React from 'react';
import { formatPrice } from '../../untils/index';
import { AddToCart } from '../../actions/CartAction';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
//import { message } from 'antd';
function Product(props) {
    const { product } = props;
    const dispatch = useDispatch();

    const AddProductToCart = async (e) => {
        e.preventDefault(); // Ngăn chuyển hướng link
        await dispatch(AddToCart(product)); // Gọi Redux action để thêm vào DB
    };
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
                <Link to="#" onClick={AddProductToCart}>Mua Ngay</Link>
            </div>
        </div>
    );
}

export default Product;
