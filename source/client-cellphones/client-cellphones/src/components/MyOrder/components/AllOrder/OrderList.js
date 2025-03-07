import React from "react";
import OrderItem from "./OrderItem";
import { formatPrice } from '../../../../untils';
const OrderList = ({ orders }) => (
  <div className="all-myorder">
    {orders.length > 0 ? (
      orders.map((order) => (
        <div key={order._id || order.id} className="all-myorder-parent-item">
          <div className="all-myorder-list">
            {order.orderItems.map((item, index) => (
              <OrderItem key={item.id || index} item={item} />
            ))}
          </div>
          <div className="all-myorder-item-totalprice">
            <span>Tổng số tiền : </span>
            <strong>{formatPrice(order.totalPrice)}đ</strong>
          </div>
        </div>
      ))
    ) : (
      <p>Bạn không có đơn hàng nào</p>
    )}
  </div>
);

export default OrderList;
