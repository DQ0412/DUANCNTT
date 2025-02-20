import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { createOrder } from "../../actions/OrderAction";
import { useHistory } from "react-router-dom";
import VnPay from "./VnPay"; 
import MoMo from "./MoMo"; 

export default function Payment() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);  // Ensure this is declared
  const [choosePay, setChoosePay] = useState({
    payLater: false,
    payOnline: false,
  });

  const { order } = useSelector((state) => state.orderInfo || {});

  const payLater = () => {
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
    await dispatch(createOrder(OrderPaid));
    history.push("/orderSuccess");
  };

  const SendOrderPayLater = async () => {
    const OrderPaid = {
      ...order,
      status: "pending", 
      paymentMethod: "payLater",
    };

    await dispatch(createOrder(OrderPaid));
    history.push("/orderSuccess");
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("http://127.0.0.1:8000/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => setSdkReady(true);  // Make sure `setSdkReady` is called here
      document.body.appendChild(script);
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
      {choosePay.payLater && (
        <div className="customer-order">
          <button onClick={SendOrderPayLater}>Đặt Hàng</button>
        </div>
      )}
      {choosePay.payOnline && (
        <div className="online-payment-options">
          <div className="payment-methods">
            <VnPay />
            <PayPalButton
              className="paypal-btn"
              style={{ color: "white", marginTop: "1rem" }}
              amount={order.total_price}
              onSuccess={successPaymentHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
}
