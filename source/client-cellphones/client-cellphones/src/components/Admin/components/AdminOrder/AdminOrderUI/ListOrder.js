import React from "react";
import Order from "./Order";

function ListOrder({ orders }) {
  console.log("🟢 Danh sách đơn hàng truyền vào component:", orders); // Debug log

  return (
    <div className="all-order">
      {orders && Array.isArray(orders) && orders.length > 0 ? (
        orders.map((item, index) => (
          <Order order={item} key={item._id || index} /> // 🔹 Đảm bảo key luôn duy nhất
        ))
      ) : (
        <p>⚠️ Không có đơn hàng.</p>
      )}
    </div>
  );
}

export default ListOrder;
