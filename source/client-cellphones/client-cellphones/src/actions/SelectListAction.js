import axios from "axios";

// API gốc
const BASE_URL = "http://127.0.0.1:8000/api";

// Hàm xử lý lỗi chung
const handleError = (error, dispatch, type) => {
    console.error("❌ Lỗi API:", error.response?.data || error.message);
    dispatch({ type, payload: error.response?.data?.message || error.message });
};

// **Lấy tất cả danh sách**
export const getAllSelectList = () => async (dispatch) => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/selectList");
        console.log("📌 API Select List:", response.data); // Debug log
        dispatch({ type: "GET_ALL_SELECT_LIST", payload: response.data });
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách select list:", error);
        dispatch({ type: "GET_ALL_SELECT_LIST_FAIL", payload: error.message });
    }
};

// **Tạo mới một mục**
export const CreateSelectListItem = (item) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/selectList/create`, item);
        dispatch({ type: "CREATE_SELECT_LIST_ITEM", payload: data });
    } catch (error) {
        handleError(error, dispatch, "CREATE_SELECT_LIST_ITEM_FAIL");
    }
};

// **Cập nhật một mục theo ID**
export const UpdateSelectListItem = (item) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/selectList/update/${item.id}`, item);
        dispatch({ type: "UPDATE_SELECT_LIST_ITEM", payload: data });
    } catch (error) {
        handleError(error, dispatch, "UPDATE_SELECT_LIST_ITEM_FAIL");
    }
};

// **Lấy chi tiết một mục theo ID**
export const getSelectListItemById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/selectList/detail/${id}`);
        dispatch({ type: "GET_SELECT_LIST_ITEM_BY_ID", payload: data });
    } catch (error) {
        handleError(error, dispatch, "GET_SELECT_LIST_ITEM_BY_ID_FAIL");
    }
};

// **Xóa một mục theo ID**
export const deleteSelectListItemById = (id) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/selectList/delete/${id}`);
        dispatch({ type: "DELETE_SELECT_LIST_ITEM_BY_ID", payload: id });
    } catch (error) {
        handleError(error, dispatch, "DELETE_SELECT_LIST_ITEM_BY_ID_FAIL");
    }
};
