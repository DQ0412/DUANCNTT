import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../../../actions/OrderAction";
import ListOrder from "../AdminOrderUI/ListOrder";

function AdminOrderAll(props) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.allOrder?.orders || []); // ✅ Đổi từ `order` thành `orders`

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  console.log("🟢 Danh sách đơn hàng từ Redux:", orders); // Debug Redux

  return (
    <div>
      {orders && orders.length > 0 ? (
        <ListOrder orders={orders} />
      ) : (
        <h4>⚠️ Không có đơn hàng</h4>
      )}
    </div>
  );
}

export default AdminOrderAll;
