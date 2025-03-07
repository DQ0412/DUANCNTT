// orderReducer.js

// Initial state cho các dữ liệu liên quan đến địa chỉ và đơn hàng
const initialState = {
  province: [],
  district: [],
  ward: [],
  order: [],
  myOrders: [],
  myOrdersPendding: [],
  myOrdersShipping: [],
  myOrdersPaid: [],
  loading: false,
  error: null,
};

// Reducer quản lý dữ liệu địa chỉ
export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PROVINCE":
      console.log("✅ Redux nhận danh sách tỉnh/thành:", action.payload);
      return { ...state, province: action.payload };
    case "GET_ALL_DISTRICT":
      return { ...state, district: action.payload };
    case "GET_ALL_WARD":
      return { ...state, ward: action.payload };
    default:
      return state;
  }
};

// Reducer lưu thông tin đơn hàng hiện tại
export const OrderInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_INFO":
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

// Reducer quản lý các đơn hàng tổng hợp
export const getAllOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_ORDER": {
      //console.log(" Redux Store cập nhật orders:", action.payload); // Debug Redux
      return { ...state, orders: action.payload };
    }
    case "REMOVE_ALL_ORDER": {
      return {orders: []};
    }
    case "GET_ALL_ORDER_PENDDING": {
      return { ...state, orderPendding: action.payload };
    }
    case "GET_ALL_ORDER_SHIPPING": {
      return { ...state, orderShipping: action.payload };
    }
    case "GET_ALL_ORDER_PAID": {
      return { ...state, orderPaid: action.payload };
    }
    case "ORDER_CREATE_SUCCESS":
      return { ...state, order: action.payload };
    case "ORDER_UPDATE_SUCCESS":
      return { ...state, order: action.payload };
    case "CANCEL_ORDER": {
      return { ...state, order: action.payload };
    }
    case "DELETE_ORDER": {
      return { ...state, order: action.payload };
    }
    case "SHIPPING_ORDER": {
      return { ...state, order: action.payload };
    }
    case "PAID_ORDER": {
      return { ...state, orders: state.orders.map(order => 
        order._id === action.payload._id ? action.payload : order
      )};
    }
    default:
      return state;
  }
};

// Reducer quản lý đơn hàng theo người dùng
export const getOrderByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ORDER_BY_USER": {
      return { ...state, myOrders: action.payload };
    }
    case "GET_ORDER_PENDDING_BY_USER": {
      return { ...state, myOrdersPendding: action.payload };
    }
    case "GET_ORDER_SHIPPING_BY_USER": {
      return { ...state, myOrdersShipping: action.payload };
    }
    case "GET_ORDER_PAID_BY_USER": {
      return { ...state, myOrdersPaid: action.payload };
    }
    default:
      return state;
  }
};

// Reducer quản lý trạng thái thanh toán của đơn hàng
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_PAY_SUCCESS":
      return { ...state, success: true };
    case "ORDER_PAY_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Reducer quản lý trạng thái tạo đơn hàng (loading, error, order)
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return { ...state, loading: true };
    case "ORDER_CREATE_SUCCESS":
      return { ...state, loading: false, order: action.payload };
    case "ORDER_CREATE_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
