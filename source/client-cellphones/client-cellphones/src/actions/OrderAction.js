import axios from "axios";
import { GHN_API_TOKEN, BASE_URL } from "../config.js";
import { message } from "antd";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } from "../constants/OrderConstants";

// Lấy token từ localStorage
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

// Declare the token in the scope of the code
let yourToken = null;

// Check if userInfo exists before accessing its token
if (userInfo && userInfo.token) {
    yourToken = userInfo.token;
    // Now you can safely use yourToken for your API requests
} else {
    console.error('User information or token not found');
    // Handle the error appropriately (e.g., redirect to login page)
}



// Check if userInfo exists before accessing its token
if (userInfo && userInfo.token) {
    yourToken = userInfo.token;
    // Now you can safely use yourToken for your API requests
} else {
    console.error('User information or token not found');
    // Handle the error appropriately (e.g., redirect to login page)
}

// Cấu hình axios gửi dữ liệu kèm token vào header
export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const { userSignin: { userInfo } } = getState();

    // Kiểm tra nếu user chưa đăng nhập
    if (!userInfo || !userInfo.token) {
      console.error("❌ Token không tồn tại! Người dùng chưa đăng nhập.");
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: "User not authenticated",
      });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("http://127.0.0.1:8000/api/orders", orderData, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,  // Lưu order vào Redux Store
    });

    return data; //  Trả về order để sử dụng ở component
  } catch (error) {
    console.error("❌ API Error Response:", error.response?.data || error.message);

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });

    throw error;  
  }
};


// Lấy tất cả tỉnh/thành
export const GetAllProvince = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
      {
        headers: {
          "Content-Type": "application/json",
          Token: GHN_API_TOKEN,
        },
      }
    );
    //console.log(" API response:", response.data);
    dispatch({ type: "GET_ALL_PROVINCE", payload: response.data.data });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách tỉnh/thành:", error.response?.data || error.message);
  }
};

// Lấy tất cả quận/huyện theo tỉnh
export const GetAllDistrict = (provinceId) => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
      {
        headers: {
          "Content-Type": "application/json",
          Token: GHN_API_TOKEN,
        },
        params: { province_id: provinceId },
      }
    );
    dispatch({ type: "GET_ALL_DISTRICT", payload: response.data.data });
  } catch (error) {
    //console.error("❌ Lỗi khi lấy danh sách quận/huyện:", error.response?.data || error.message);
  }
};

// Lấy tất cả phường/xã theo quận
export const GetAllWard = (districtId) => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
      {
        headers: {
          "Content-Type": "application/json",
          Token: GHN_API_TOKEN,
        },
        params: { district_id: districtId },
      }
    );
    dispatch({ type: "GET_ALL_WARD", payload: response.data.data });
  } catch (error) {
    //console.error("❌ Lỗi khi lấy danh sách phường/xã:", error.response?.data || error.message);
  }
};
export const getAllOrdersByUser = (userId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    
    // Check if the user is authenticated
    if (!userInfo || !userInfo.token) {
      console.error("Token is missing. User might not be logged in.");
      return;
    }

    // Send request to API to fetch all orders by user
    const { data } = await axios.get(`${BASE_URL}/orders/all/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    // Dispatch action to store the fetched orders in Redux state
    dispatch({ type: 'GET_ALL_ORDERS', payload: data });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    dispatch({ type: 'GET_ALL_ORDERS_FAIL', payload: error.message });
  }
};
// Lấy tất cả đơn hàng
export const getAllOrder = () => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();

    if (!userInfo || !userInfo.token) {
      console.error("❌ Người dùng chưa đăng nhập!");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    };

    const { data } = await axios.get("http://127.0.0.1:8000/api/admin/orders", config);

    console.log("🟢 API Response (Orders):", data);

    dispatch({ type: "GET_ALL_ORDER", payload: data });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách đơn hàng:", error.response?.data || error.message);
  }
};


// Cập nhật đơn hàng
export const updateOrder = (orderId, order) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    const { data } = await axios.put(`${BASE_URL}/order/update/${orderId}`, order, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: "ORDER_UPDATE_SUCCESS", payload: data });
    message.success("✅ Cập nhật đơn hàng thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật đơn hàng:", error.response?.data || error.message);
    message.error("❌ Không thể cập nhật đơn hàng!");
  }
};

// Xóa đơn hàng
export const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    await axios.delete(`${BASE_URL}/order/delete/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(getAllOrder());
    message.success("✅ Xóa đơn hàng thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi xóa đơn hàng:", error.response?.data || error.message);
    message.error("❌ Không thể xóa đơn hàng!");
  }
};
// Lấy đơn hàng đang chờ
export const GetAllOrderPendding = () => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    if (!userInfo || !userInfo.token) return;

    const { data } = await axios.get(`${BASE_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: "GET_ALL_ORDER_PENDDING", payload: data });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách đơn hàng đang chờ:", error.response?.data || error.message);
  }
};

// Cập nhật trạng thái giao hàng
export const ShippingOrder = (orderId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    if (!userInfo || !userInfo.token) {
      console.error("❌ Người dùng chưa đăng nhập!");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/order/shipping/${orderId}`,
      {},  
      config
    );

    dispatch({ type: "SHIPPING_ORDER", payload: data });
    console.log("✅ Cập nhật trạng thái giao hàng thành công!", data);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật trạng thái giao hàng:", error.response?.data || error.message);
  }
};

//  **Hủy đơn hàng**
export const cancelOrder = (orderId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    if (!userInfo || !userInfo.token) {
      console.error("❌ Người dùng chưa đăng nhập!");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/order/cancel/${orderId}`,
      {},  
      config
    );

    dispatch({ type: "CANCEL_ORDER", payload: data });
    console.log("✅ Hủy đơn hàng thành công!", data);
  } catch (error) {
    console.error("❌ Lỗi khi hủy đơn hàng:", error.response?.data || error.message);
  }
};


// Lấy đơn hàng theo người dùng
export const getOrderByUser = (idUser) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    if (!userInfo || !userInfo.token) return;

    const response = await axios.get(
      `${BASE_URL}/order/${idUser}`,
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );

    dispatch({ type: "GET_ORDER_BY_USER", payload: response.data });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách đơn hàng của người dùng:", error.response?.data || error.message);
  }
};

export const OrderInfo = (order, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    };

    const { data } = await axios.post(`${BASE_URL}/orders`, order, config);
    dispatch({ type: 'ORDER_SUCCESS', payload: data });
    return data;
  } catch (error) {
    dispatch({ type: 'ORDER_FAIL', payload: error.response?.data?.message || error.message });
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const getOrderPaidByUser = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders/paid/${userId}`);
    dispatch({ type: "GET_ORDER_PAID", payload: data });
  } catch (error) {
    console.error("Error fetching paid orders:", error);
  }
};
export const getOrderPenddingByUser = (idUser) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();

    if (!userInfo || !userInfo.token) {
      console.error("❌ Lỗi: Người dùng chưa đăng nhập!");
      return;
    }

    const response = await axios.get(
      `${BASE_URL}/order/orderPendding/${idUser}`,
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );

    dispatch({ type: "GET_ORDER_PENDDING_BY_USER", payload: response.data });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách đơn hàng đang chờ:", error.response?.data || error);
  }
};

// Lấy đơn hàng đang chờ


// Lấy đơn hàng đang giao
export const getOrderShippingByUser = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders/shipping/${userId}`);
    dispatch({ type: "GET_ORDER_SHIPPING", payload: data });
  } catch (error) {
    console.error("Error fetching shipping orders:", error);
  }
};

