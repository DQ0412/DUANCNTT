import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"; 

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' }); // Bắt đầu loading

    // Gửi yêu cầu đăng nhập
    const { data } = await axios.post(`${BASE_URL}/user/login`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Kiểm tra dữ liệu trả về từ API
    if (!data || !data.user || !data.token) {
      console.error("❌ API không trả về dữ liệu hợp lệ:", data);
      throw new Error("API không trả về dữ liệu hợp lệ!");
    }

    // Log token để kiểm tra
    console.log("🔑 Token nhận được:", data.token);

    // Xóa dữ liệu cũ trong localStorage
    localStorage.removeItem("userInfo");

    // Lưu user và token vào Redux
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });

    // Lưu vào localStorage
    localStorage.setItem("userInfo", JSON.stringify({
      ...data.user,
      token: data.token
    }));

    // Kiểm tra lại sau khi lưu
    const savedUserInfo = localStorage.getItem("userInfo");
    if (!savedUserInfo) {
      console.error("❌ Không lưu được userInfo vào localStorage");
      throw new Error("Không thể lưu dữ liệu đăng nhập! Vui lòng thử lại.");
    } else {
      console.log("✅ userInfo đã được lưu:", JSON.parse(savedUserInfo));
    }

  } catch (error) {
    // Log lỗi và dispatch
    console.error("❌ Đăng nhập thất bại:", error.response?.data || error.message);
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error.response?.data?.message || "Đăng nhập thất bại",
    });
  }
};


export const SignupUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_SIGNUP_REQUEST' });
    const { data } = await axios.post(`${BASE_URL}/user/register`, user);

    dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_SIGNUP_FAIL',
      payload: error.response?.data?.message || "Đăng ký thất bại",
    });
  }
};

export const SignoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_SIGNOUT_SUCCESS" });
};

export const getAllUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_ALL_USER_REQUEST" });

    const { userSignin: { userInfo } } = getState();
    const { data } = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: "GET_ALL_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_USER_FAIL", payload: error.message });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "DELETE_USER_REQUEST" });

    const { userSignin: { userInfo } } = getState();
    await axios.delete(`${BASE_URL}/user/delete/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: "DELETE_USER_SUCCESS", payload: userId });
  } catch (error) {
    dispatch({ type: "DELETE_USER_FAIL", payload: error.message });
  }
};
