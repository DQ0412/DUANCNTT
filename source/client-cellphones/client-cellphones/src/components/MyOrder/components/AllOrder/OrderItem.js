import React from "react";
import { formatPrice } from "../../../../untils/index";

const OrderItem = ({ item }) => (
  <div className="all-myorder-item">
    <div className="all-myorder-item-img">
      <img src={item.image} alt={item.name} />
    </div>
    <div className="all-myorder-item-name">
      <p>{item.name}</p>
      <span>x{item.qty}</span>
    </div>
    <div className="all-myorder-item-price">
      {formatPrice(item.salePrice)}
    </div>
  </div>
);

export default OrderItem;
