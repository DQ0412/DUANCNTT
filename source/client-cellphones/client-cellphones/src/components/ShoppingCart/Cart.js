import React from 'react';
import { formatPrice } from '../../untils';
import './ShoppingCart.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";  // Import useHistory for v5
import { DeleteToCart, UpdateQtyProduct } from '../../actions/CartAction';

function Cart(props) {
    const history = useHistory();  // Use useHistory() for navigation in v5
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart?.cartItems || []);
    const userInfo = useSelector((state) => state.userSignin?.userInfo || null);

    const totalPrice = cartItems.reduce((total, item) => {
        const price = item.salePrice ?? item.price ?? 0; 
        return total + (item.qty * price);
    }, 0);

    const Order = () => {
        if (userInfo) {
            history.push("/order");  // Use history.push() for navigation
        } else {
            alert("Bạn cần đăng nhập để đặt hàng!");
            history.push("/login");
        }
    };

    const decreaseQty = (product) => {
      if (product.qty > 1) {
          dispatch(UpdateQtyProduct(product.id, product.qty - 1)); // Giảm số lượng
      } else {
          dispatch(DeleteToCart(product.id)); // Nếu số lượng = 1, xóa luôn sản phẩm
      }
  };
  
  const increaseQty = (product) => {
      dispatch(UpdateQtyProduct(product.id, product.qty + 1)); // Tăng số lượng
  };

    return (
        <section id="shopping-cart">
            <div className="shopping-cart">
                <div className="shopping-cart-header">
                    <Link to="/" className="back">Tiếp tục mua hàng</Link>
                    <h2 className="shopping-cart-title">Giỏ hàng</h2>
                </div>

                {cartItems.length > 0 ? (
                    <div className="shopping-cart-list">
                        {cartItems.map((product, index) => (
                            <div className="shopping-cart-list-product" key={index}>
                                <div className="shopping-cart-list-product-block">
                                    <div className="shopping-cart-list-product-block-left">
                                        <img src={product.image || "/default-image.png"} alt={product.name} />
                                    </div>
                                    <div className="shopping-cart-list-product-block-right">
                                        <p className="product-name">{product.name}</p>
                                        <p className="product-price">{formatPrice(product.salePrice ?? product.price ?? 0)}</p>
                                    </div>

                                    <div className="shopping-cart-list-product-bottom">
                                        <ul className="button-event">
                                            <li onClick={() => decreaseQty(product)}>-</li>
                                            <li>{product.qty}</li>
                                            <li onClick={() => increaseQty(product)}>+</li>
                                        </ul>
                                        <button className="delete-product" onClick={() => dispatch(DeleteToCart(product.id))}>
                                            Xóa khỏi giỏ hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="empty-cart">Giỏ hàng trống!</p>
                )}

                <div className="total-price">
                    <span className="left">Tổng tiền</span>
                    <span className="right">{totalPrice > 0 ? formatPrice(totalPrice) : "0đ"}</span>
                </div>

                {totalPrice > 0 && (
                    <div className="order">
                        <Link onClick={() => Order()}> Đặt Hàng </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Cart;
