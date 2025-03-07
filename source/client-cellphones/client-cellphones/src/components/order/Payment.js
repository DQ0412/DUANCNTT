import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useHistory } from "react-router-dom";
import { createOrder } from "../../actions/OrderAction"; // Đảm bảo đường dẫn đúng
import VnPay from "./VnPay"; 
import MoMo from "./MoMo"; // Đảm bảo rằng bạn đã import MoMo vào đây
import { clearCart } from "../../actions/CartAction"; // Action để xóa giỏ hàng

export default function Payment() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const [choosePay, setChoosePay] = useState({
    payLater: false,
    payOnline: false,
  });

  const { order } = useSelector((state) => state.orderInfo || {}); // Lấy thông tin đơn hàng từ state

  const payLater = async () => {
    setChoosePay({ payOnline: false, payLater: true });


  };

  const payOnline = () => {
    setChoosePay({ payLater: false, payOnline: true });
  };

  const successPaymentHandler = async (paymentResult) => {
    const OrderPaid = {
      ...order,
      status: "pending",
      paymentMethod: "payOnline",
      paymentResult: { ...paymentResult },
    };
    await dispatch(createOrder(OrderPaid)); // Gọi action tạo đơn hàng

    // Sau khi thanh toán thành công, xóa sản phẩm trong giỏ hàng và chuyển hướng về trang chủ
    dispatch(clearCart()); // Xóa giỏ hàng
    history.push("/"); // Quay lại trang chủ
  };

  const SendOrderPayLater = async () => {
    const OrderPaid = {
      ...order,
      status: "pending",
      paymentMethod: "payLater",
    };

    await dispatch(createOrder(OrderPaid));

    // Sau khi chọn "Thanh toán khi nhận hàng", xóa giỏ hàng và quay về trang chủ
    dispatch(clearCart()); // Xóa giỏ hàng
    history.push("/"); // Quay lại trang chủ
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/config/paypal");
        const clientId = data.clientId;
        if (!clientId) {
          console.error("PayPal clientId is missing in API response.");
          return;
        }
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
        script.async = true;
        script.onload = () => setSdkReady(true);
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading PayPal SDK script:", error);
      }
    };
    addPayPalScript();
  }, []);

  return (
    <div className="choose-pay">
      <h4>CHỌN PHƯƠNG THỨC THANH TOÁN</h4>
      <div className="choose">
        <button
          className={choosePay.payLater ? "active" : ""}
          onClick={payLater}
        >
          Thanh toán khi nhận hàng
        </button>
        <button
          className={choosePay.payOnline ? "active" : ""}
          onClick={payOnline}
        >
          Thanh toán Online
        </button>
      </div>
      
      {choosePay.payOnline && (
        <div className="online-payment-options">
          <div className="payment-methods">
            <VnPay />
            <MoMo /> 
            {sdkReady && (
              <PayPalButton
                className="paypal-btn"
                style={{ color: "white", marginTop: "1rem" }}
                amount={order?.total_price}
                onSuccess={successPaymentHandler}
              />
            )}
          </div>
        </div>
      )}

      {/*{choosePay.payLater && (
        <div className="pay-later-option">
          <button onClick={SendOrderPayLater}>Đặt hàng khi nhận hàng</button>
        </div>
      )}*/}
    </div>
  );
}
