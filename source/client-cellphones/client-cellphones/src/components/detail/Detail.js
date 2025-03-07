import React, { useEffect, useState } from 'react';
import './Detail.css';
import DetailInfo from './DetailInfo';
import RateStar from './RateStar';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../actions/ProductAction';
import CommentProduct from './CommentProduct';
import BlogContent from './BlogContent';
import AboutProduct from './AboutProduct';

function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const detailProduct = useSelector(state => state.getProductById?.product || null);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (id) {
            setLoading(true);
            dispatch(getProductById(id)).then(() => setLoading(false));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (detailProduct?.image) {
            const isFullUrl = detailProduct.image.startsWith("http://") || detailProduct.image.startsWith("https://");
            setImageUrl(isFullUrl ? detailProduct.image : `http://127.0.0.1:8000/storage/${detailProduct.image}`);
        }
    }, [detailProduct]);

    return (
        <section id="detail">
            {loading ? (
                <p>Đang tải dữ liệu sản phẩm...</p>
            ) : detailProduct ? (
                <div className="detail">
                    <div className="detail-title">
                        <h2>{detailProduct.name || "Không có tên sản phẩm"}</h2>
                    </div>

                    <div className="detail-info">
                        <div className="detail-info-slide">
                            <div className="detail-info-slide-image">
                                <img 
                                    src={imageUrl || "/default-image.jpg"} 
                                    alt={detailProduct.name} 
                                    onError={(e) => e.target.src = "/default-image.jpg"}
                                />
                            </div>
                        </div>

                        <DetailInfo product={detailProduct} />
                    </div>

                    {/* Bảng thông số kỹ thuật */}
                    <div>
                        <AboutProduct product={detailProduct} />
                    </div>

                    <div>
                        <BlogContent product={detailProduct} />
                    </div>

                    <div>
                        <RateStar product={detailProduct} />
                    </div>

                    <div>
                        <CommentProduct product={detailProduct} />
                    </div>
                </div>
            ) : (
                <p>Không tìm thấy sản phẩm</p>
            )}
        </section>
    );
}

export default Detail;
