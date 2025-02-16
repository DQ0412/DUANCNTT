import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rate, Row, Col, Divider, Progress } from 'antd';
import { useParams } from 'react-router-dom';
import { reviewProduct } from '../../actions/ProductAction';

function RateStar() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [star, setStar] = useState(0);
    const [showRate, setShowRate] = useState(false);
    const [showEvaluate, setShowEvaluate] = useState(false);
    const [evaluate, setEvaluate] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const userInfo = userSignin?.userInfo || null;
        
    const product = useSelector(state => state.getProductById.product);

    //Kiểm tra dữ liệu trước khi sử dụng
    if (!product || !product.reviews) {
        return <p>Chưa có đánh giá nào.</p>;
    }

    const countReview = product.reviews.length;
    const averageRate = countReview > 0
        ? Math.round(product.reviews.reduce((a, c) => a + c.star, 0) / countReview)
        : 0;

    const existsUser = userInfo
        ? product.reviews.find(x => x.name === userInfo.name)
        : null;

    const getStarPercentage = (starValue) => {
        return countReview > 0
            ? Math.round((product.reviews.filter(x => x.star === starValue).length / countReview) * 100)
            : 0;
    };

    const onFinish = () => {
        if (!userInfo) {
            alert('Vui lòng đăng nhập để đánh giá sản phẩm.');
            return;
        }

        const review = {
            name: userInfo.name,
            star: star,
            comment: evaluate,
        };

        dispatch(reviewProduct(id, review));
        setEvaluate('');
        setShowEvaluate(false);
        setShowRate(false);
    };

    return (
        <div className="rate-container">
            <Row>
                <Col span={18} xs={24} sm={24} md={24}>
                    <span className="rate-star-title">{countReview} Đánh giá {product.name}</span>
                </Col>
            </Row>

            <Row>
                <Col span={18} xs={24} sm={24} md={18}>
                    <div className="rate">
                        <div className="rate-info">
                            <Row>
                                <Col span={7} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                    <p className="star-average" style={{ textTransform: 'uppercase', fontSize: '18px' }}>Sao trung bình</p>
                                    <p className="star-average-num" style={{ marginBottom: 0, fontSize: '25px', color: 'orange' }}>
                                        {averageRate}
                                        <Rate disabled value={averageRate} />
                                    </p>
                                </Col>

                                <Col span={10}>
                                    {[5, 4, 3, 2, 1].map(starValue => (
                                        <li key={starValue} className="thongke">
                                            <div className="numstar">{starValue} <Rate disabled value={1} /></div>
                                            <p className="percent">
                                                <Progress
                                                    status="active"
                                                    percent={getStarPercentage(starValue)}
                                                    strokeColor="orange"
                                                    style={{ width: '100%' }}
                                                />
                                            </p>
                                        </li>
                                    ))}
                                </Col>

                                {!existsUser && (
                                    <Col span={7} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                        <button className="guidanhgia" onClick={() => setShowRate(true)}> Gửi đánh giá </button>
                                    </Col>
                                )}
                            </Row>
                        </div>

                        {showRate && (
                            <div className="rate-star">
                                <p>Vui lòng chọn đánh giá:</p>
                                <Rate onChange={setStar} />
                                <button className="guidanhgia" onClick={() => setShowEvaluate(true)}> Tiếp tục </button>
                            </div>
                        )}

                        {showEvaluate && (
                            <div className="rate-send">
                                <p>Đánh giá: </p>
                                <textarea
                                    placeholder="Vui lòng đánh giá sản phẩm ở đây"
                                    onChange={(e) => setEvaluate(e.target.value)}
                                    value={evaluate}
                                />
                                <button className="guidanhgia" onClick={onFinish}> Gửi </button>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>

            <Row style={{ marginTop: '1rem' }}>
                {product.reviews.map((item, index) => (
                    <Col key={index} span={18} xs={24} sm={24} md={18}>
                        <div className="danhgia">
                            <p className="name" style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.name}</p>
                            <div className="cmt" style={{ display: 'flex' }}>
                                <Rate disabled value={item.star} style={{ fontSize: '14px' }} />
                                <p className="cmt" style={{ marginLeft: '1rem' }}>{item.comment}</p>
                            </div>
                            <Divider />
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default RateStar;
