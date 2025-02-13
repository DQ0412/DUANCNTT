import axios from "axios";

export const getAllTypeProduct = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:4000/typeList");
        dispatch({ type: "GET_ALL_TYPE_PRODUCT", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_ALL_TYPE_PRODUCT_FAIL", payload: error.message });
    }
};

export const CreateNewTypeProduct = (type) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:4000/typeList/create", type);
        dispatch({ type: "CREATE_NEW_TYPE_PRODUCT", payload: response.data });
    } catch (error) {
        dispatch({ type: "CREATE_NEW_TYPE_PRODUCT_FAIL", payload: error.message });
    }
};

export const deleteTypeProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:4000/typeList/delete/${id}`);
        dispatch({ type: "DELETE_TYPE_PRODUCT", payload: id });
    } catch (error) {
        dispatch({ type: "DELETE_TYPE_PRODUCT_FAIL", payload: error.message });
    }
};
