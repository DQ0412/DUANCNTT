import axios from "axios";
import { message } from "antd";

const BASE_URL = "http://127.0.0.1:8000/api";
let config = {
  headers: {
    "Content-Type": "application/json",
    "Token": "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7",
  },
};

// ✅ Thêm hàm `GetAllProvince`
export const GetAllProvince = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
      config
    );
    dispatch({ type: "GET_ALL_PROVINCE", payload: data });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tỉnh/thành:", error);
  }
};
// ✅ Lấy danh sách đơn hàng đã thanh toán của người dùng theo ID
export const getOrderPaidByUser = (idUser) => async (dispatch, getState) => {
  try {
      const { userSignin: { userInfo } } = getState();

      if (!userInfo || !userInfo.token) {
          console.error("❌ Lỗi: Người dùng chưa đăng nhập!");
          return;
      }

      const response = await axios.get(
          `http://localhost:4000/order/orderPaid/${idUser}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: "GET_ORDER_PAID_BY_USER", payload: response.data });
  } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách đơn hàng đã thanh toán của người dùng:", error.response?.data || error);
  }
};
// ✅ Lấy danh sách đơn hàng đang chờ xử lý của người dùng theo ID
export const getOrderPenddingByUser = (idUser) => async (dispatch, getState) => {
  try {
      const { userSignin: { userInfo } } = getState();

      if (!userInfo || !userInfo.token) {
          console.error("❌ Lỗi: Người dùng chưa đăng nhập!");
          return;
      }

      const response = await axios.get(
          `http://localhost:4000/order/orderPendding/${idUser}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: "GET_ORDER_PENDDING_BY_USER", payload: response.data });
  } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách đơn hàng đang chờ xử lý của người dùng:", error.response?.data || error);
  }
};

// ✅ Thêm hàm `GetAllWard`
export const GetAllWard = (districtId) => async (dispatch, getState) => {
  const newConfig = {
    headers: {
      Token: "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7"
    },
    params: {
      district_id: districtId
    }
  };

  try {
    const { data } = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
      newConfig
    );
    dispatch({ type: "GET_ALL_WARD", payload: data });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách phường/xã:", error);
  }
};
// ✅ Tạo đơn hàng
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();

        if (!userInfo || !userInfo.token) {
            message.error("Bạn cần đăng nhập để đặt hàng!");
            return;
        }

        const { data } = await axios.post(`${BASE_URL}/order/create`, order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });

        dispatch({ type: "ORDER_CREATE_SUCCESS", payload: data });
        dispatch({ type: "CART_EMPTY" });
        localStorage.removeItem("cartItems");
        message.success("Đặt hàng thành công!");
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error.response?.data || error);
        message.error("Không thể tạo đơn hàng!");
    }
};
export const GetAllDistrict = (provinceId) => async (dispatch, getState) => {
  const newConfig = {
    headers: {
      Token: "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7"
    },
    params: {
      province_id: provinceId
    }
  };
  try {
    const { data } = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`,
      newConfig
    );
    dispatch({ type: "GET_ALL_DISTRICT", payload: data });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quận/huyện:", error);
  }
};

// ✅ Lấy danh sách đơn hàng
export const getAllOrder = () => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        if (!userInfo || !userInfo.token) return;

        const { data } = await axios.get(`${BASE_URL}/order`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "GET_ALL_ORDER", payload: data });
    } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error.response?.data || error);
    }
};

// ✅ Cập nhật đơn hàng
export const updateOrder = (orderId, order) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();

        const { data } = await axios.put(`${BASE_URL}/order/update/${orderId}`, order, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "ORDER_UPDATE_SUCCESS", payload: data });
        message.success("Cập nhật đơn hàng thành công!");
    } catch (error) {
        console.error("Lỗi khi cập nhật đơn hàng:", error.response?.data || error);
        message.error("Không thể cập nhật đơn hàng!");
    }
};

// ✅ Xóa đơn hàng
export const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();

        await axios.delete(`${BASE_URL}/order/delete/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch(getAllOrder()); // Cập nhật lại danh sách đơn hàng sau khi xóa
        message.success("Xóa đơn hàng thành công!");
    } catch (error) {
        console.error("Lỗi khi xóa đơn hàng:", error.response?.data || error);
        message.error("Không thể xóa đơn hàng!");
    }
};
export const GetAllOrderPendding = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(
      `http://localhost:4000/order/orderPendding`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "GET_ALL_ORDER_PENDDING", payload: data });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng đang chờ:", error);
  }
};

// OrderInfo để lưu thông tin đơn hàng trước khi gửi đi
export const OrderInfo = (orderInfo) => async (dispatch) => {
  dispatch({ type: "ORDER_INFO", payload: orderInfo });
};
// ✅ Thêm ShippingOrder để cập nhật trạng thái đơn hàng thành "Đang giao"
export const ShippingOrder = (orderId) => async (dispatch, getState) => {
  try {
      const { userSignin: { userInfo } } = getState();

      if (!userInfo || !userInfo.token) {
          console.error("❌ Lỗi: Người dùng chưa đăng nhập!");
          return;
      }

      const response = await axios.put(
          `http://localhost:4000/order/shipping/${orderId}`,
          {},
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: "SHIPPING_ORDER", payload: response.data });
  } catch (error) {
      console.error("❌ Lỗi khi cập nhật trạng thái giao hàng:", error.response?.data || error);
  }
};
// ✅ Hủy đơn hàng theo orderId
export const cancelOrder = (orderId) => async (dispatch, getState) => {
  try {
      const { userSignin: { userInfo } } = getState();

      if (!userInfo || !userInfo.token) {
          console.error("❌ Lỗi: Người dùng chưa đăng nhập!");
          return;
      }

      const response = await axios.put(
          `http://localhost:4000/order/cancel/${orderId}`,
          {},
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: "CANCEL_ORDER", payload: response.data });
  } catch (error) {
      console.error("❌ Lỗi khi hủy đơn hàng:", error.response?.data || error);
  }
};
// ✅ Lấy danh sách đơn hàng của người dùng theo ID
export const getOrderByUser = (idUser) => async (dispatch, getState) => {
  try {
      const { userSignin: { userInfo } } = getState();

      if (!userInfo || !userInfo.token) {
          console.error("❌ Lỗi: Người dùng chưa đăng nhập!");
          return;
      }

      const response = await axios.get(
          `http://localhost:4000/order/${idUser}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: "GET_ORDER_BY_USER", payload: response.data });
  } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách đơn hàng của người dùng:", error.response?.data || error);
  }
};
// ✅ Lấy danh sách đơn hàng đang giao của người dùng theo ID
export const getOrderShippingByUser = (idUser) => async (dispatch, getState) => {
  try {
      const { userSignin: { userInfo } } = getState();

      if (!userInfo || !userInfo.token) {
          console.error("❌ Lỗi: Người dùng chưa đăng nhập!");
          return;
      }

      const response = await axios.get(
          `http://localhost:4000/order/orderShipping/${idUser}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: "GET_ORDER_SHIPPING_BY_USER", payload: response.data });
  } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách đơn hàng đang giao của người dùng:", error.response?.data || error);
  }
};
