import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../components/ShoppingCart/Cart';
import { AddToCart, fetchCart } from '../actions/CartAction';
import { useLocation } from 'react-router-dom';

function CartPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const userInfo = useSelector(state => state.userSignin.userInfo);

    useEffect(() => {
        // Lấy tham số sản phẩm từ URL nếu có
        const params = new URLSearchParams(location.search);
        const productId = params.get('id');
        const quantity = params.get('quantity') || 1;

        if (productId) {
            dispatch(AddToCart({ id: productId, quantity }));
        }

        // Sau đó lấy danh sách giỏ hàng từ Database
        if (userInfo) {
            dispatch(fetchCart());
        }
    }, [dispatch, location, userInfo]);

    return (
        <div>
            <Cart />
        </div>
    );
}

export default CartPage;
