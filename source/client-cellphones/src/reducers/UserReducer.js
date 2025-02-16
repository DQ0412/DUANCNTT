export const UserSigninReducer = (state = {userInfo: null}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { ...state, loading: true }; // Thêm trạng thái loading
        case 'USER_LOGIN_SUCCESS':
            return { ...state, loading: false, userInfo: action.payload, error: null };
        case 'USER_LOGIN_FAIL':
            return { ...state, loading: false, userInfo: null, error: action.payload };
        case 'USER_SIGNOUT_SUCCESS':
            return {}; // Reset state khi đăng xuất
        default:
            return state;
    }
};

export const UserSignupReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_SIGNUP_REQUEST':
            return { ...state, loading: true }; // Thêm trạng thái loading
        case 'USER_SIGNUP_SUCCESS':
            return { ...state, loading: false, userInfo: action.payload, error: null };
        case 'USER_SIGNUP_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getAllUserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case 'GET_ALL_USER_REQUEST':
            return { ...state, loading: true };
        case 'GET_ALL_USER_SUCCESS':
            return { ...state, loading: false, users: action.payload };
        case 'GET_ALL_USER_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
            };
        default:
            return state;
    }
};
