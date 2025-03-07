import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderPaidByUser } from "../../../../actions/OrderAction";
import { formatPrice } from "../../../../untils/index";
//import "./AllOrder.css";

const OrderParent = ({ order }) => (
  <div className="all-myorder-parent-item">
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
);