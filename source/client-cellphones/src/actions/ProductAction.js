import axios from "axios";
import { BASE_URL } from "../constants/UserConstant";

// Lấy danh sách sản phẩm từ API
export const getAllProduct = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://127.0.0.1:8000/api/products");
    console.log("Redux nhận danh sách sản phẩm:", data); // Debug dữ liệu
    
    dispatch({ type: "GET_ALL_PRODUCT", payload: data });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    dispatch({ type: "GET_ALL_PRODUCT_FAIL", payload: error.message });
  }
};

// Xóa sản phẩm (Admin API)
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const { adminSignin: { adminInfo } } = getState();
    
    await axios.delete(`${BASE_URL}/admin/products/delete/${id}`, {
      headers: { Authorization: `Bearer ${adminInfo.token}` }
    });

    dispatch({ type: "DELETE_PRODUCT", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_PRODUCT_FAIL", payload: error.message });
  }
};

// Lấy chi tiết sản phẩm theo ID
export const getProductById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/detail/${id}`);
    dispatch({ type: "GET_PRODUCT_BY_ID", payload: data });
  } catch (error) {
    dispatch({ type: "GET_PRODUCT_BY_ID_FAIL", payload: error.message });
  }
};

// Tìm kiếm sản phẩm
export const searchProduct = (name) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/search`, {
      params: { name }
    });
    dispatch({ type: "SEARCH_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "SEARCH_PRODUCT_FAIL", payload: error.message });
  }
};

// Thêm Blog cho sản phẩm
export const BlogProduct = (id, blog, callback) => async (dispatch, getState) => {
  const { adminSignin: { adminInfo } } = getState();
  try {
    const { data } = await axios.post(`${BASE_URL}/admin/products/blog/${id}`, blog, {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    });
    dispatch({ type: "BLOG_PRODUCT", payload: data });
    if (callback) callback();
  } catch (error) {
    dispatch({ type: "BLOG_PRODUCT_FAIL", payload: error.message });
  }
};

// Sắp xếp sản phẩm tăng dần theo giá
export const ascendingProduct = () => async (dispatch, getState) => {
  try {
    const { productList } = getState().allProduct;
    const sortedProducts = [...productList].sort((a, b) => a.sale_price - b.sale_price);

    dispatch({ type: "ASCENDING_PRODUCT", payload: sortedProducts });
  } catch (error) {
    dispatch({ type: "ASCENDING_PRODUCT_FAIL", payload: error.message });
  }
};

// Sắp xếp sản phẩm giảm dần theo giá
export const descendingProduct = () => async (dispatch, getState) => {
  try {
    const { productList } = getState().allProduct;
    const sortedProducts = [...productList].sort((a, b) => b.sale_price - a.sale_price);

    dispatch({ type: "DESCENDING_PRODUCT", payload: sortedProducts });
  } catch (error) {
    dispatch({ type: "DESCENDING_PRODUCT_FAIL", payload: error.message });
  }
};

// Lọc sản phẩm theo khoảng giá
export const filterProductByPrice = (startPrice, endPrice) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/filter-price`, {
      params: { start_price: startPrice, end_price: endPrice },
    });

    dispatch({
      type: "FILTER_PRODUCT_BY_PRICE",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "FILTER_PRODUCT_BY_PRICE_FAIL",
      payload: error.message,
    });
  }
};

// Lọc sản phẩm theo trường bất kỳ
export const filterProductByRandomField = (filterParams) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/products/filter`, filterParams);

    dispatch({
      type: "FILTER_PRODUCT_BY_RANDOM_FIELD",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "FILTER_PRODUCT_BY_RANDOM_FIELD_FAIL",
      payload: error.message,
    });
  }
};

// Phân trang sản phẩm
export const paginationProduct = (page) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/pagination/${page}`);

    dispatch({
      type: "PAGINATION_PRODUCT",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PAGINATION_PRODUCT_FAIL",
      payload: error.message,
    });
  }
};

// Bình luận sản phẩm
export const commentProduct = (id, comment) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    
    const { data } = await axios.post(
      `${BASE_URL}/products/comment/${id}`,
      { content: comment },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: "COMMENT_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "COMMENT_PRODUCT_FAIL", payload: error.message });
  }
};

// Trả lời bình luận
export const repCommentProduct = (id, comment) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();

    const { data } = await axios.post(
      `${BASE_URL}/products/reply-comment/${id}`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: "REP_COMMENT_PRODUCT",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "REP_COMMENT_PRODUCT_FAIL",
      payload: error.message,
    });
  }
};

// Đánh giá sản phẩm
export const reviewProduct = (id, review) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();

    const { data } = await axios.post(
      `${BASE_URL}/products/review/${id}`,
      review,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: "REVIEW_PRODUCT",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "REVIEW_PRODUCT_FAIL",
      payload: error.message,
    });
  }
};

// Thêm/Sửa sản phẩm (Admin API)
export const saveProduct = (product) => async (dispatch, getState) => {
  try {
    const { adminSignin: { adminInfo } } = getState();

    let data;
    if (!product.id) {
      data = await axios.post(`${BASE_URL}/admin/products/create`, product, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      });
    } else {
      data = await axios.put(`${BASE_URL}/admin/products/update/${product.id}`, product, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      });
    }

    dispatch({ type: "SAVE_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "SAVE_PRODUCT_FAIL", payload: error.message });
  }
};
export const editCurrentPage = (page) => async (dispatch) => {
  dispatch({ type: "EDIT_CURRENT_PAGE", payload: page });
};

export const pinCommentProduct = (id, comment) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();

    const { data } = await axios.post(
      `${BASE_URL}/products/pin-comment/${id}`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: "PIN_COMMENT_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "PIN_COMMENT_PRODUCT_FAIL", payload: error.message });
  }
};

export const removeProductById = () => (dispatch) => {
  dispatch({ type: "REMOVE_PRODUCT_BY_ID" });
};
// In actions/ProductAction.js


export const filterProductByType = (type) => {
  return {
    type: 'FILTER_BY_TYPE',
    payload: type,
  };
};

