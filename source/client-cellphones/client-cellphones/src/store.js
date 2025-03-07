import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 🔹 Lưu Redux state vào localStorage

import { CartReducer } from "./reducers/CartReducer";
import { UserSigninReducer, UserSignupReducer, getAllUserReducer } from "./reducers/UserReducer";
import { getAllProductReducer, getProductByIdReducer, searchProductReducer } from "./reducers/ProductReducer";
import { ListTypeProductReducer } from "./reducers/ListTypeProductReducer";
import { fetchCart } from "./actions/CartAction";
import { addressReducer, getAllOrderReducer, getOrderByUserReducer } from "./reducers/OrderReducer";
//import rootReducer from "./reducers";

// 🔹 Kết hợp tất cả reducers
const rootReducer = combineReducers({
  userSignin: UserSigninReducer,
  userSignup: UserSignupReducer,
  allUsers: getAllUserReducer,
  allProduct: getAllProductReducer,
  getProductById: getProductByIdReducer,
  searchProduct: searchProductReducer,
  allTypeProduct: ListTypeProductReducer,
  cart: CartReducer,
  address: addressReducer,  
  allOrder: getAllOrderReducer,  // ✅ Đúng key dùng trong useSelector
  orderByUser: getOrderByUserReducer,
});

// Cấu hình redux-persist để lưu Redux state vào localStorage
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "userSignin"], // 🔹 Chỉ lưu giỏ hàng & thông tin đăng nhập
};

// 🔹 Tạo reducer có persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Lấy thông tin từ localStorage khi load trang
const initialState = {
  userSignin: { 
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null 
  },
  cart: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || []
  }
};

// Middleware xử lý async actions
const middleware = [thunk];

// 🔹 Tạo store với persistedReducer 
const store = createStore(
  persistedReducer,
  initialState,
  //rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Khi user đăng nhập, tải lại giỏ hàng từ database
store.dispatch((dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  if (userInfo) {
    dispatch(fetchCart()).catch((error) => {
      console.error("❌ Lỗi khi tải giỏ hàng từ API:", error);
    });
  }
});

// Tạo persistor để lưu state
export const persistor = persistStore(store);

export default store;
