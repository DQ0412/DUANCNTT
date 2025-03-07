export const TypeProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_NEW_TYPE_PRODUCT":
      return { ...state, typeProduct: action.payload };

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

const initialState = { List: [] };

export const ListTypeProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_TYPE_PRODUCT":
            console.log("📌 Cập nhật Redux với danh sách:", action.payload); // Log kiểm tra Redux

            return { ...state, List: action.payload };
        case "CREATE_NEW_TYPE_PRODUCT":
            return { ...state, List: [...state.List, action.payload] };
        case "DELETE_TYPE_PRODUCT":
            return { ...state, List: state.List.filter(item => item.id !== action.payload) };
        case "GET_ALL_TYPE_PRODUCT_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};


