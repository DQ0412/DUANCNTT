import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { paginationProduct } from "../../../../actions/ProductAction";
import Product from './Product';
import { Pagination } from 'antd';

function ListProduct() {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.allProduct.productList);
    const currentPage = useSelector(state => state.allProduct.currentPage);
    const pages = useSelector(state => state.allProduct.pages);  // Tổng số trang

    console.log(" Component ListProduct nhận Redux State:", productList); // Debug Redux State

    // Kiểm tra và đảm bảo pages và currentPage là số hợp lệ
    const validPages = pages && !isNaN(pages) ? pages : 1;
    const validCurrentPage = currentPage && !isNaN(currentPage) ? currentPage : 1;

    useEffect(() => {
        console.log("🚀 useEffect() chạy - gọi API lấy danh sách sản phẩm");
        dispatch(paginationProduct(validCurrentPage));  // Gọi API với trang hiện tại
    }, [dispatch, validCurrentPage]);

    return (
        <div className="admin-product-list">
            <table>
                 <thead>
                     <tr>
                         <th>#</th>
                         <th>Image</th>
                         <th>Name</th>
                         <th>Price</th>
                         <th>Type</th>
                     </tr>
                 </thead>
                 <tbody>
                     {
                         productList && productList.length > 0 ? 
                         productList.map((item, index) => (
                             <Product 
                                 product={item} 
                                 key={item.id} 
                                 update={item.id} 
                                 number={index + 1} 
                             />
                         )) 
                         : <tr><td colSpan="5">Không có sản phẩm nào</td></tr>
                     }
                 </tbody>
             </table>

             <div className="pagination">
                 <Pagination 
                     current={validCurrentPage} // Sử dụng trang hiện tại
                     total={validPages * 10}  // Tổng số sản phẩm, thay vì tổng số trang
                     pageSize={10}  // Giới hạn số sản phẩm mỗi trang
                     onChange={(page) => {
                         dispatch(paginationProduct(page));  // Khi thay đổi trang, gọi lại API
                     }}
                 />
             </div>
        </div>
    );
}

export default ListProduct;
