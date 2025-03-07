import axios from "axios";
import { message } from "antd";

// Định nghĩa BASE_URL để dùng chung
const BASE_URL = "http://127.0.0.1:8000/api";

// Lấy token từ Redux State
const getConfig = (getState) => {
  const { userSignin: { userInfo } } = getState();
  
  if (!userInfo || !userInfo.token) {
    console.error("❌ Token không tồn tại! Người dùng chưa đăng nhập.");
    return null;
  }

  return {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      "Content-Type": "application/json",
    },
  };
};

// 🚀 **Cập nhật đơn hàng trên GHN**
export const createOrderGhn = (orderId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    if (!userInfo || !userInfo.token) {
      console.error("❌ Người dùng chưa đăng nhập!");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${BASE_URL}/order/ghn/${orderId}`, {}, config);

    dispatch({ type: "CREATE_ORDER_GHN", payload: data });
    message.success("✅ Đơn hàng đã được gửi lên GHN thành công!");
  } catch (error) {
    //console.error("❌ Lỗi khi gửi đơn hàng GHN:", error.response?.data || error.message);
    //message.error("❌ Không thể gửi đơn hàng lên GHN!");
  }
};
// 🖨 **In đơn hàng GHN**
export const PrintOrderGhn = (orderId) => async (dispatch, getState) => {
  try {
    const config = getConfig(getState);
    if (!config) return;

    const { data } = await axios.get(`${BASE_URL}/order/print/${orderId}`, config);
    
    // Mở trang in đơn hàng
    window.open(data);
    dispatch({ type: "PRINT_ORDER_GHN", payload: data });

    console.log("✅ In đơn hàng GHN thành công!", data);
  } catch (error) {
    console.error("❌ Lỗi khi in đơn hàng GHN:", error.response?.data || error.message);
  }
};
