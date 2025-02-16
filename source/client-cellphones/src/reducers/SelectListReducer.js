const initialState = {
  List: [],
  SelectItem: null,
  error: null
};

export const SelectListReducer = (state = initialState, action) => {
  switch (action.type) {
      case "GET_ALL_SELECT_LIST":
          return { ...state, List: action.payload };

      case "CREATE_SELECT_LIST_ITEM":
          return { ...state, List: [...state.List, action.payload] };

      case "UPDATE_SELECT_LIST_ITEM":
          return {
              ...state,
              List: state.List.map(item =>
                  item.id === action.payload.id ? action.payload : item
              ),
              SelectItem: action.payload
          };

      case "GET_SELECT_LIST_ITEM_BY_ID":
          return { ...state, SelectItem: action.payload };

      case "DELETE_SELECT_LIST_ITEM_BY_ID":
          return {
              ...state,
              List: state.List.filter(item => item.id !== action.payload),
              SelectItem: null
          };

      default:
          return state;
  }
};
