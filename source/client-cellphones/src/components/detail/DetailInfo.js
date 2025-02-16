import React from 'react';
import { useDispatch } from 'react-redux';
import { AddToCart } from '../../actions/CartAction';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../untils/index';

function DetailInfo({ product }) {
    const dispatch = useDispatch();

    // Kiểm tra nếu product không tồn tại, tránh lỗi khi truy cập thuộc tính undefined
    if (!product) {
        return <p>Không tìm thấy thông tin sản phẩm.</p>; 
    }

    // Kiểm tra nếu giá bị null hoặc undefined, tránh lỗi NaN
    const salePrice = product.sale_price ? formatPrice(product.sale_price) : "Chưa có giá";
    const price = product.price ? formatPrice(product.price) : "Chưa có giá";

    function handleAddProduct() {
        dispatch(AddToCart(product)); 
    }

    return (
        <div className="detail-info-right">
            <div className="detail-info-right-price">
                <p className="price-box">
                    <span className="saleprice">{salePrice}đ</span>
                    {product.price && (
                        <span className="old-price">
                            Giá niêm yết: <strong className="price">{price}đ</strong>
                        </span>
                    )}
                </p>
                <p className="detail-info-sale">
                    Sản phẩm thuộc chương trình HOT SALE CUỐI TUẦN - Nhanh tay thanh toán!
                </p>
            </div>

            <div className="detail-info-right-buy">
                <div className="detail-info-right-buy-now">
                    <Link to="/cart" onClick={handleAddProduct}>
                        <strong>MUA NGAY</strong>
                        <br />
                        <span>(Giao tận nơi hoặc lấy tại cửa hàng)</span>
                    </Link>
                </div>
                <div className="detail-info-right-buy-installment">
                    <a href="#">
                        <strong>TRẢ GÓP 0%</strong>
                        <br />
                        <span>(Xét duyệt qua điện thoại)</span>
                    </a>
                    <a href="#">
                        <strong>TRẢ GÓP QUA THẺ</strong>
                        <br />
                        <span>(Visa, Master, JCB)</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default DetailInfo;
