import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createOrder } from "../../actions/OrderAction";

export default function VnPay() {
  const dispatch = useDispatch();

  // ✅ Lấy dữ liệu từ Redux
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const orderInfo = useSelector((state) => state.orderInfo || {});
  const userInfo = useSelector((state) => state.userSignin?.userInfo || {});

  const [loading, setLoading] = useState(false);

  const handleVNPay = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let currentOrder = orderInfo?.order || {};

      console.log("📤 Gửi dữ liệu đơn hàng lên API:", currentOrder);

      // ✅ Kiểm tra giỏ hàng hợp lệ
      if (!cartItems || cartItems.length === 0) {
        alert("❌ Giỏ hàng trống! Vui lòng thêm sản phẩm.");
        setLoading(false);
        return;
      }

      // ✅ Kiểm tra user đăng nhập
      if (!userInfo || !userInfo.token) {
        alert("❌ Vui lòng đăng nhập trước khi thanh toán.");
        setLoading(false);
        return;
      }

      // ✅ Nếu chưa có order, tạo mới
      if (!currentOrder || Object.keys(currentOrder).length === 0) {
        const newOrder = {
          orderItems: cartItems.map(item => ({
            product_id: item.product_id ? parseInt(item.product_id) : (item.id ? parseInt(item.id) : null),
            qty: parseInt(item.qty),
            price: parseFloat(item.salePrice || item.price),
          })).filter(item => item.product_id !== null),

          totalPrice: parseFloat(cartItems.reduce((total, item) => total + (parseFloat(item.salePrice || item.price) * parseInt(item.qty)), 0)),
          province: userInfo.province || "N/A",
          district: userInfo.district || "N/A",
          ward: userInfo.ward || "N/A",
          customAddress: userInfo.customAddress || "N/A",
          name: userInfo.name || "Guest",
          phone: userInfo.phone || "0000000000",
          payment_method: "VNPAY",
          payment_status: "pending",
        };

        console.log("📤 Gửi dữ liệu đơn hàng:", newOrder);

        try {
          const createdOrder = await dispatch(createOrder(newOrder));
          console.log("📦 Đơn hàng đã tạo:", createdOrder);

          if (createdOrder && createdOrder.order) {
            currentOrder = createdOrder.order;
            currentOrder.totalPrice = parseFloat(createdOrder.order.total_price); // ✅ Lấy từ API trả về
            console.log("✅ Đơn hàng sau khi cập nhật:", currentOrder);
          } else {
            console.error("❌ API không trả về đơn hàng hợp lệ!", createdOrder);
            alert("Đơn hàng không hợp lệ!");
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("❌ Lỗi tạo đơn hàng:", error);
          alert("Không thể tạo đơn hàng.");
          setLoading(false);
          return;
        }
      }

      // ✅ Kiểm tra totalPrice hợp lệ trước khi gửi VNPAY
      if (!currentOrder || !currentOrder.totalPrice || isNaN(currentOrder.totalPrice)) {
        console.error("❌ totalPrice không hợp lệ:", currentOrder.totalPrice);
        alert("❌ Đơn hàng không hợp lệ!");
        setLoading(false);
        return;
      }

      console.log("📤 Đơn hàng gửi lên VNPAY:", currentOrder);

      // ✅ Gửi yêu cầu thanh toán đến VNPAY
      const OrderPaid = {
        amount: parseFloat(currentOrder.total_price),
        orderId: currentOrder.id, 
        bankCode: "",
        language: "vn",
      };

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/payment/createVNPayPayment", OrderPaid, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        console.log("📩 Phản hồi từ API:", response);

        if (!response || !response.data) {
          throw new Error("API không trả về dữ liệu hợp lệ!");
        }

        if (response.data.code === "00") {
          window.location.href = response.data.data;
        } else {
          alert("❌ Lỗi khi xử lý thanh toán: " + (response.data.message || "Không xác định"));
        }
      } catch (error) {
        console.error("❌ Lỗi kết nối VNPAY:", error);
        if (error.response) {
          console.error("🔥 Phản hồi lỗi từ API:", error.response.data);
          alert(`❌ Lỗi API: ${error.response.data.message || "Không xác định"}`);
        } else {
          alert("❌ Không thể kết nối với hệ thống thanh toán.");
        }
      }
    } catch (error) {
      console.error("❌ Lỗi trong quá trình xử lý:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleVNPay} disabled={loading}>
        {loading ? "Đang xử lý..." : "Thanh toán qua VNPAY"}
      </button>
    </div>
  );
}
