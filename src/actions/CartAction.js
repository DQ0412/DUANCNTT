import axios from 'axios';

export const AddToCart = (product) => async (dispatch) => {
    try {
        // Gửi yêu cầu POST đến API Laravel
        const response = await axios.post('/api/cart/add', {
            product_id: product.id,
            quantity: product.quantity,
        });

        // Nếu thành công, dispatch action với payload từ response
        dispatch({ type: 'ADD_TO_CART', payload: response.data });
    } catch (error) {
        console.error("Failed to add product to cart:", error);
    }
};

export const DeleteToCart = (product) => async (dispatch) => {
    try {
        // Gửi yêu cầu DELETE đến API Laravel
        const response = await axios.delete(`/api/cart/delete/${product.id}`);

        // Nếu thành công, dispatch action với payload từ response
        dispatch({ type: 'DELETE_TO_CART', payload: response.data });
    } catch (error) {
        console.error("Failed to delete product from cart:", error);
    }
};

export const DeleteQtyProduct = (product) => async (dispatch) => {
    try {
        // Gửi yêu cầu PUT đến API Laravel để giảm số lượng
        const response = await axios.put(`/api/cart/update-quantity/${product.id}`, {
            quantity: product.quantity,
        });

        // Nếu thành công, dispatch action với payload từ response
        dispatch({ type: 'DELETE_QTY_PRODUCT', payload: response.data });
    } catch (error) {
        console.error("Failed to update product quantity:", error);
    }
};
