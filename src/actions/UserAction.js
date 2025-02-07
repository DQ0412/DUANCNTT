import axios from 'axios';

// Đăng nhập người dùng
export const login = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:8000/api/user/login', user);  // Đổi URL đến Laravel backend
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Đăng ký người dùng
export const SignupUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:8000/api/user/register', user);  // Đổi URL đến Laravel backend
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: data });
    document.location.href = '/';  // Điều hướng đến trang chủ sau khi đăng ký thành công
  } catch (error) {
    dispatch({
      type: 'USER_SIGNUP_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Đăng xuất người dùng
export const SignoutUser = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_SIGNOUT_SUCCESS', payload: {} });
  document.location.href = '/';  // Điều hướng về trang chủ sau khi đăng xuất
};

// Lấy tất cả người dùng
export const getAllUser = () => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get('http://localhost:8000/api/users', {
      headers: { Authorization: `Bearer ${userInfo.token}` },  // Thêm Authorization nếu cần
    });
    dispatch({ type: 'GET_ALL_USER', payload: data });
  } catch (error) {
    dispatch({ type: 'GET_ALL_USER_FAIL', payload: error.message });
  }
};

// Xóa người dùng
export const deleteUser = (userId) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`http://localhost:8000/api/user/delete/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },  // Thêm Authorization nếu cần
    });
    dispatch({ type: 'DELETE_USER', payload: data });
  } catch (error) {
    dispatch({ type: 'DELETE_USER_FAIL', error: error.message });
  }
};
