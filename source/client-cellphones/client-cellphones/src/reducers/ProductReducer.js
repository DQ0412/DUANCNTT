const initialState = {
    productList: [], 
    currentPage: 1,
    totalPages: 1,
    error: null,
    products: [],  
  filteredProducts: [], 
};
export const getProductByTypeReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case "GET_PRODUCT_BY_TYPE":
            return { ...state, products: action.payload };
        case "GET_PRODUCT_BY_TYPE_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const productReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case 'FILTER_BY_PRICE':
        const { startPrice, endPrice } = action.payload;
        const filteredByPrice = state.products.filter(
          (product) => product.price >= startPrice && product.price <= endPrice
        );
        return {
          ...state,
          filteredProducts: filteredByPrice,
        };
  
      case 'FILTER_BY_TYPE':
        const type = action.payload;
        const filteredByType = state.products.filter(
          (product) => product.type === type  // Assuming your products have a 'type' property
        );
        return {
          ...state,
          filteredProducts: filteredByType,
        };
        case "PAGINATION_PRODUCT":
            return {
                ...state,
                productList: action.payload.products,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
            };
        case "PAGINATION_PRODUCT_FAIL":
            return {
                ...state,
                error: action.payload,
            };
            case "UPDATE_PRODUCT_SUCCESS":
                console.log("✅ Redux cập nhật sản phẩm:", action.payload);
                return { ...state, product: action.payload };
              case "UPDATE_PRODUCT_FAIL":
                console.error("❌ Redux lỗi cập nhật sản phẩm:", action.payload);
                return { ...state, error: action.payload };
        case "GET_PRODUCT_BY_ID":
            return { ...state, product: action.payload };
        case "GET_PRODUCT_BY_ID_FAIL":
            return { ...state, error: action.payload };
        case "GET_PRODUCT_SUCCESS":
            console.log("✅ Redux đã nhận sản phẩm:", action.payload);

            return { ...state, product: action.payload };
        case "GET_PRODUCT_FAIL":
            console.error("❌ Redux nhận lỗi API");
            return { ...state, product: {} };
        case "REMOVE_PRODUCT":
            return { ...state, product: {} };
        default:
            return state;
        }
  };


export const getAllTypeProductReducer = (state = { types: [] }, action) => {
    switch (action.type) {
        case "GET_ALL_TYPE_PRODUCT":
            return { ...state, types: action.payload };
        case "GET_ALL_TYPE_PRODUCT_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const getAllProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PRODUCT':
            //console.log("🚀 Redux nhận danh sách sản phẩm:", action.payload); 
            return { 
                ...state, 
                productList: action.payload|| [],  
                currentPage: action.payload.currentPage || 1,
            };

        case 'GET_ALL_PRODUCT_FAIL':
            return { ...state, error: action.payload };

        case 'ASCENDING_PRODUCT': {
            if (!state.productList || state.productList.length === 0) return state; // 🔹 Tránh lỗi nếu không có sản phẩm
            let sortedList = [...state.productList].sort((a, b) => b.sale_price - a.sale_price);
            return { ...state, productList: sortedList };
        }

        case 'DESCENDING_PRODUCT': {
            if (!state.productList || state.productList.length === 0) return state; // 🔹 Tránh lỗi nếu không có sản phẩm
            let sortedList = [...state.productList].sort((a, b) => a.sale_price - b.sale_price);
            return { ...state, productList: sortedList };
        }

        case 'FILTER_PRODUCT': {
            if (!state.productList || state.productList.length === 0) return state; // 🔹 Tránh lỗi nếu không có sản phẩm
            let filteredList = state.productList.filter(item => item.type === action.payload);
            return { ...state, filteredProducts: filteredList };
        }

        case 'FILTER_PRODUCT_BY_PRICE': {
            if (!state.productList || state.productList.length === 0) return state; // 🔹 Tránh lỗi nếu không có sản phẩm
            let filteredList = state.productList.filter(item => 
                item.sale_price >= action.payload.startPrice && item.sale_price <= action.payload.endPrice
            );
            return { ...state, filteredProducts: filteredList };
        }

        case 'SAVE_PRODUCT':
            return { ...state, productList: [...state.productList, action.payload] };

        case 'DELETE_PRODUCT': {
            if (!state.productList || state.productList.length === 0) return state; // 🔹 Tránh lỗi nếu không có sản phẩm
            const updatedList = state.productList.filter(item => item.id !== action.payload);
            return { ...state, productList: updatedList };
        }

        case 'EDIT_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };

        
        default:
            return state;
    }
};

const initialProductState = {
    product: null,
    error: null
};

export const getProductByIdReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case "GET_PRODUCT_SUCCESS":
            console.log("✅ Redux cập nhật sản phẩm:", action.payload);
            return { product: action.payload} ;
        case "GET_PRODUCT_FAIL":
            console.error("❌ Redux lỗi API");
            return {  error: action.payload };
        case "REMOVE_PRODUCT":
            return {  }; // ✅ Đảm bảo reset sản phẩm
        default:
            return state;
    }
};


const initialSearchState = {
    searchResults: [],
    error: null
};
export const searchProductReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case 'SEARCH_PRODUCT':
            return { ...state, searchResults: action.payload };

        case 'SEARCH_PRODUCT_FAIL':
            return { ...state, error: action.payload };

        default:
            return state;
    }
};