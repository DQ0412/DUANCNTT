import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const getAllTypeProduct = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/typeList`);
        dispatch({ type: "GET_ALL_TYPE_PRODUCT", payload: response.data });
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách loại sản phẩm:", error);
        dispatch({ type: "GET_ALL_TYPE_PRODUCT_FAIL", payload: error.message });
    }
};

export const CreateNewTypeProduct = (type) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/typeList/create`, type);
        dispatch({ type: "CREATE_NEW_TYPE_PRODUCT", payload: response.data });
        dispatch(getAllTypeProduct());
    } catch (error) {
        console.error("❌ Lỗi khi tạo loại sản phẩm:", error);
        dispatch({ type: "CREATE_NEW_TYPE_PRODUCT_FAIL", payload: error.message });
    }
};

export const deleteTypeProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/typeList/delete/${id}`);
        dispatch({ type: "DELETE_TYPE_PRODUCT", payload: id });
        dispatch(getAllTypeProduct());
    } catch (error) {
        console.error("❌ Lỗi khi xóa loại sản phẩm:", error);
        dispatch({ type: "DELETE_TYPE_PRODUCT_FAIL", payload: error.message });
    }
};
