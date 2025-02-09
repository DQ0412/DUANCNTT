const initialState = {
    productList: [], 
    currentPage: 1,
    error: null
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
