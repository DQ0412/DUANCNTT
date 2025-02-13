import axios from "axios";
import { message } from "antd";

const BASE_URL = "http://127.0.0.1:8000/api";

//  Thêm sản phẩm vào giỏ hàng
export const AddToCart = (product) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        
        if (!userInfo || !userInfo.token) {
            message.error("Bạn cần đăng nhập để thêm vào giỏ hàng!");
            return;
        }

        const response = await axios.post(
            `${BASE_URL}/cart/add`, 
            { product_id: product.id, quantity: 1 }, 
            { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch(fetchCart()); 
        dispatch({ type: "ADD_TO_CART", payload: response.data });
        dispatch(fetchCart()); //  Load lại giỏ hàng sau khi thêm sản phẩm
        message.success("Thêm vào giỏ hàng thành công!");
    } catch (error) {
        console.error("❌ Lỗi khi thêm vào giỏ hàng:", error.response?.data || error);
        message.error(error.response?.data?.message || "Không thể thêm vào giỏ hàng!");
    }
};

//  Lấy giỏ hàng từ API
export const fetchCart = () => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        if (!userInfo || !userInfo.token) return;

        const response = await axios.get(`${BASE_URL}/cart`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch({ type: "FETCH_CART_SUCCESS", payload: response.data.cart || [] });
    } catch (error) {
        console.error("❌ Lỗi khi lấy giỏ hàng:", error.response?.data || error);
    }
};

//  Xóa toàn bộ sản phẩm khỏi giỏ hàng
export const DeleteToCart = (productId) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        console.log("📌 Đang gửi yêu cầu xóa sản phẩm ID:", productId);

        if (!productId) {
            console.error("❌ Không có `productId` để xóa!");
            message.error("Không thể xóa sản phẩm do thiếu ID!");
            return;
        }

        if (!userInfo || !userInfo.token) {
            message.error("Bạn cần đăng nhập để xóa sản phẩm.");
            return;
        }

        await axios.delete(`${BASE_URL}/cart/remove/${productId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch(fetchCart()); // ✅ Load lại giỏ hàng sau khi xóa
        message.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
    } catch (error) {
        console.error("❌ Lỗi khi xóa sản phẩm:", error.response?.data || error);
        message.error("Không thể xóa sản phẩm!");
    }
};




//  Cập nhật số lượng sản phẩm trong giỏ hàng
export const UpdateQtyProduct = (productId, quantity) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        
        if (!userInfo || !userInfo.token) {
            message.error("Bạn cần đăng nhập để cập nhật số lượng.");
            return;
        }

        if (!productId) {
            console.error("❌ Lỗi: productId bị undefined khi cập nhật số lượng!");
            return;
        }

        console.log("🔹 Gửi yêu cầu cập nhật số lượng:", { productId, quantity });

        const response = await axios.put(
            `${BASE_URL}/cart/update-quantity/${productId}`,
            { quantity },
            { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );

        console.log("✅ Phản hồi từ server:", response.data);

        dispatch(fetchCart()); // Load lại giỏ hàng sau khi cập nhật
        message.success("Cập nhật số lượng sản phẩm thành công!");
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật số lượng:", error.response?.data || error);
        message.error(error.response?.data?.message || "Không thể cập nhật số lượng!");
    }
};


//  Xóa từng số lượng sản phẩm (giảm số lượng)
export const DeleteQtyProduct = (productId) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        if (!userInfo || !userInfo.token) {
            message.error("Bạn cần đăng nhập để cập nhật giỏ hàng.");
            return;
        }

        const response = await axios.put(
            `${BASE_URL}/cart/decrease-quantity/${productId}`,
            {},
            { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );

        dispatch(fetchCart()); //  Load lại giỏ hàng sau khi giảm số lượng
        message.success("Giảm số lượng sản phẩm thành công!");
    } catch (error) {
        console.error("❌ Lỗi khi giảm số lượng sản phẩm:", error.response?.data || error);
        message.error("Không thể giảm số lượng!");
    }
};
