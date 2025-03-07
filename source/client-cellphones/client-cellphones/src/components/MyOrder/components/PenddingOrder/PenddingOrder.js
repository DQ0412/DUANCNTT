import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderPaidByUser } from "../../../../actions/OrderAction";
import { formatPrice } from "../../../../untils/index";
//import './AllOrder.css';
const OrderItem = ({ item }) => (
  <div className="all-myorder-item">
    <div className="all-myorder-item-img">
      <img src={item.image} alt={item.name} />
    </div>
    <div className="all-myorder-item-name">
      <p>{item.name}</p>
      <span>x{item.qty}</span>
    </div>
    <div className="all-myorder-item-price">{formatPrice(item.salePrice)}</div>
  </div>
);

const OrderParent = ({ order }) => (
  <div className="all-myorder-parent-item">
    <div className="all-myorder-list">
      {order.orderItems.map((item) => (
        <OrderItem key={item.id || Math.random()} item={item} />
      ))}
    </div>
    <div className="all-myorder-item-totalprice">
      <span>Tổng số tiền : </span>
      <strong>{formatPrice(order.totalPrice)}đ</strong>
    </div>
  </div>
);

function PaidOrder() {
  const dispatch = useDispatch();
  const { myOrdersPaid } = useSelector((state) => state.orderByUser);
  const { userInfo } = useSelector((state) => state.userSignin);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(getOrderPaidByUser(userInfo._id));
    }
  }, [dispatch, userInfo]);

  return (
    <div className="all-myorder">
      {myOrdersPaid && myOrdersPaid.length > 0 ? (
        myOrdersPaid.map((order) => (
          <OrderParent key={order._id || order.id} order={order} />
        ))
      ) : (
        <p>Bạn không có đơn hàng nào</p>
      )}
    </div>
  );
}

export default PaidOrder;
