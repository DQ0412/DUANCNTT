import axios from "axios";

export const getAllSelectList = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:4000/selectList");
        dispatch({ type: "GET_ALL_SELECT_LIST", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_ALL_SELECT_LIST_FAIL", payload: error.message });
    }
};

export const CreateSelectListItem = (item) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:4000/selectList/create", item);
        dispatch({ type: "CREATE_SELECT_LIST_ITEM", payload: response.data });
    } catch (error) {
        dispatch({ type: "CREATE_SELECT_LIST_ITEM_FAIL", payload: error.message });
    }
};

export const UpdateSelectListItem = (item) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:4000/selectList/update/${item.id}`, item);
        dispatch({ type: "UPDATE_SELECT_LIST_ITEM", payload: response.data });
    } catch (error) {
        dispatch({ type: "UPDATE_SELECT_LIST_ITEM_FAIL", payload: error.message });
    }
};

export const getSelectListItemById = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:4000/selectList/detail/${id}`);
        dispatch({ type: "GET_SELECT_LIST_ITEM_BY_ID", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_SELECT_LIST_ITEM_BY_ID_FAIL", payload: error.message });
    }
};

export const deleteSelectListItemById = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:4000/selectList/delete/${id}`);
        dispatch({ type: "DELETE_SELECT_LIST_ITEM_BY_ID", payload: id });
    } catch (error) {
        dispatch({ type: "DELETE_SELECT_LIST_ITEM_BY_ID_FAIL", payload: error.message });
    }
};
