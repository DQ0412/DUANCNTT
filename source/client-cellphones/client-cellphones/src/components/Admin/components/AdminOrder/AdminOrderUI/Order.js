import React from "react";
import { useDispatch } from "react-redux";
import { createOrderGhn, PrintOrderGhn } from "../../../../../actions/GhnAction";
import { deleteOrder, getAllOrder, ShippingOrder } from "../../../../../actions/OrderAction";
import { formatPrice, formatDateOrderPaypal } from "../../../../../untils/index";

function Order(props) {
  const { order } = props;
  const dispatch = useDispatch();

  // ✅ Kiểm tra order hợp lệ
  if (!order || typeof order !== "object") {
    return <p>⚠️ Đơn hàng không hợp lệ hoặc chưa có dữ liệu.</p>;
  }

  // ✅ API trả về `items`, đổi từ `orderItems` sang `items`
  const orderItems = Array.isArray(order.items) ? order.items : [];

  // ✅ Kiểm tra các trường hợp khác
  const {
    total_price, // Fix lỗi totalPrice -> total_price
    payment_method, // Fix lỗi paymentMethod -> payment_method
    cancelOrder,
    custom_address, // Fix shippingAddress -> custom_address
    district,
    province,
    ward,
    phone,
    status,
    payment,
  } = order;

  const handleShippingOrder = async (order) => {
    await dispatch(createOrderGhn(order.id));
    await dispatch(ShippingOrder(order.id));
    dispatch(getAllOrder());
  };

  const handlePrintOrder = (order) => {
    dispatch(PrintOrderGhn(order.id));
  };

  const handleDeleteOrder = async (order) => {
    await dispatch(deleteOrder(order.id));
    dispatch(getAllOrder());
  };

  return (
    <div className="order-list">
      <div className="order-list-items">
        {orderItems.length > 0 ? (
          orderItems.map((item, index) => (
            <div className="order-items-item" key={item.id || index}>
              <span className="qty">Qty: {item.quantity}</span>
              <span className="name">Product ID: {item.product_id}</span>
            </div>
          ))
        ) : (
          <p>⚠️ Không có sản phẩm trong đơn hàng.</p>
        )}
      </div>

      <div className="totalPrice">
        <span>Tổng tiền: {formatPrice(total_price)}</span>
      </div>

      <div className="order-info">
        <div className="order-info-address">
          <b>Địa chỉ: </b>
          {custom_address
            ? `${custom_address}, ${province}, ${district}, ${ward}, ${phone}`
            : "Chưa có địa chỉ giao hàng"}
        </div>
      </div>

      {payment && payment.updated_at && (
        <div className="order-payment-check">
          Paid: {formatDateOrderPaypal(payment.updated_at)}
        </div>
      )}

      <div className="order-bottom">
        {status === "shipping" && (
          <div className="order-status">
            <span>
              Đã xác nhận
              {payment_method === "payOnline" && <span>& Đã thanh toán</span>}
            </span>
          </div>
        )}

        <div className="order-button">
          {status === "pending" && !cancelOrder && (
            <button className="shipping" onClick={() => handleShippingOrder(order)}>
              Xác nhận đơn hàng
            </button>
          )}

          {cancelOrder && (
            <>
              <span>Khách yêu cầu hủy đơn</span>
              <button className="shipping" onClick={() => handleDeleteOrder(order)}>
                Hủy đơn
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
