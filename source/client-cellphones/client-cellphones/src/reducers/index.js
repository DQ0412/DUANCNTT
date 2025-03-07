import { combineReducers } from "redux";
import { productReducer, getAllProductReducer, getProductByIdReducer, searchProductReducer } from "./ProductReducer";
import { selectListReducer } from "./selectListReducer";
const rootReducer = combineReducers({
    allProduct: productReducer,
    productDetails: getProductByIdReducer,
    productSearch: searchProductReducer,
    allProductList: getAllProductReducer,
    selectList: selectListReducer,
});

export default rootReducer;
