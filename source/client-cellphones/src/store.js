import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { CartReducer } from "./reducers/CartReducer";

import { UserSigninReducer, UserSignupReducer, getAllUserReducer } from "./reducers/UserReducer";
import { getAllProductReducer, getProductByIdReducer, searchProductReducer } from "./reducers/ProductReducer";
import { getAllTypeProductReducer } from "./reducers/ListTypeProductReducer";
import { fetchCart } from "./actions/CartAction";
import { addressReducer } from "./reducers/OrderReducer";
import { getAllOrderReducer } from "./reducers/OrderReducer";
const reducer = combineReducers({
    userSignin: UserSigninReducer,
    userSignup: UserSignupReducer,
    allUsers: getAllUserReducer,
    allProduct: getAllProductReducer,
    getProductById: getProductByIdReducer,
    searchProduct: searchProductReducer,
    allTypeProduct: getAllTypeProductReducer,
    cart: CartReducer,
    address: addressReducer,  
    orders: getAllOrderReducer
});



const initialState = {
    userSignin: { userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null },
    cart: {
        cartItems: JSON.parse(localStorage.getItem("cartItems")) || []
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

// Khi user đăng nhập, tải lại giỏ hàng từ database
/*store.subscribe(() => {
    const { userSignin: { userInfo } } = store.getState();
    if (userInfo) {
        store.dispatch(fetchCart());
    }
});*/

store.dispatch((dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    if (userInfo) {
        dispatch(fetchCart());
    }
});
export default store;
