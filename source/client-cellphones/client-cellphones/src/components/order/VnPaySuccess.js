import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckOutlined } from '@ant-design/icons';

export default function VnPaySuccess() {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null); // State to hold payment status

  useEffect(() => {
    const getResultVNPay = async () => {
      const query = location.search; // Extract query parameters from URL
      try {
        // Send GET request to your backend
        const { data } = await axios.get(`http://127.0.0.1:8000/api/payment/vnpay-return${query}`);
        if (data.code === "00") {
          // Handle successful payment
          setPaymentStatus("Thanh toán thành công!");
        } else {
          // Handle failure
          setPaymentStatus("Thanh toán thất bại.");
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching VNPay response:", error);
        setPaymentStatus("Có lỗi xảy ra khi xử lý thanh toán.");
      }
    };

    getResultVNPay();
  }, [location.search]); // Run this effect when the query changes

  return (
    <section id="order-success">
      <div className="order-success">
        <span><CheckOutlined /></span>
        <p>{paymentStatus}</p> {/* Display payment status */}
        <div className="links">
          <Link to="/myOrder">Xem lại đơn hàng</Link>
          <Link to="/">Trang chủ</Link>
        </div>
      </div>
    </section>
  );
}
