const initialState = {
    cartItems: []
};

export const CartReducer = (state = initialState, action) => {
    let updatedCart;
    
    switch (action.type) {
        case "FETCH_CART_SUCCESS":
            return { ...state, cartItems: action.payload };

        case "ADD_TO_CART":
            updatedCart = [...state.cartItems, action.payload];
            return { ...state, cartItems: updatedCart };

        case "DELETE_TO_CART":
            updatedCart = state.cartItems.filter(item => item._id !== action.payload._id);
            return { ...state, cartItems: updatedCart };
        case "LOAD_CART_ITEMS":
            return { ...state, cartItems: action.payload };
          
        case "UPDATE_QTY_PRODUCT":
            updatedCart = state.cartItems.map(item =>
                item._id === action.payload._id ? { ...item, qty: action.payload.qty } : item
            );
            return { ...state, cartItems: updatedCart };

        case "CLEAR_CART":
            return { ...state, cartItems: [] };

        case "FETCH_CART_FAIL":
            return { ...state, error: action.payload };

        default:
            return state;
    }
};
