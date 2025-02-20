const initialState = {
    productList: [], 
    currentPage: 1,
    error: null,
    products: [],  // This should contain all your products
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

export const productReducer = (state = initialState, action) => {
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
            console.log("Redux nhận danh sách sản phẩm:", action.payload); // 🔥 Debug API Response
            return { ...state, productList: action.payload };

        case 'GET_ALL_PRODUCT_FAIL':
            return { ...state, error: action.payload };

        case 'ASCENDING_PRODUCT': {
            let sortedList = [...state.productList].sort((a, b) => b.sale_price - a.sale_price);
            return { ...state, productList: sortedList };
        }

        case 'DESCENDING_PRODUCT': {
            let sortedList = [...state.productList].sort((a, b) => a.sale_price - b.sale_price);
            return { ...state, productList: sortedList };
        }

        case 'FILTER_PRODUCT': {
            let filteredList = state.productList.filter(item => item.type === action.payload);
            return { ...state, productList: filteredList };
        }

        case 'FILTER_PRODUCT_BY_PRICE': {
            let filteredList = state.productList.filter(item => 
                item.sale_price >= action.payload.startPrice && item.sale_price <= action.payload.endPrice
            );
            return { ...state, productList: filteredList };
        }

        case 'SAVE_PRODUCT':
            return { ...state, productList: [...state.productList, action.payload] };

        case 'DELETE_PRODUCT': {
            const updatedList = state.productList.filter(item => item.id !== action.payload);
            return { ...state, productList: updatedList };
        }

        case 'EDIT_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };

        case 'PAGINATION_PRODUCT':
            return { ...state, productList: action.payload };

        default:
            return state;
    }
};
const initialProductState = {
    product: null,
    error: null
};

export const getProductByIdReducer = (state = initialProductState, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_BY_ID':
            return { ...state, product: action.payload };

        case 'REMOVE_PRODUCT_BY_ID':
            return { ...state, product: null };

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

