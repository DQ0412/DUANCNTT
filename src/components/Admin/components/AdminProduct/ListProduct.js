import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCurrentPage, paginationProduct } from '../../../../actions/ProductAction';
import Product from './Product';
import { Pagination } from 'antd';

function ListProduct(props) {
    const dispatch = useDispatch();
    const { listProducts } = props;
    const currentPage = useSelector(state => state.allProduct.currentPage);
    const pages = useSelector(state => state.allProduct.pages);

    // Debug kiểm tra danh sách sản phẩm
    console.log("Danh sách sản phẩm nhận được:", listProducts);

    const HandleChangePage = async (number) => {
        await dispatch(paginationProduct(number));
        dispatch(editCurrentPage(number));
    };

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
                        listProducts && listProducts.length > 0 ? 
                        listProducts.map((item, index) => (
                            <Product 
                                product={item} 
                                key={item.id}  // Sửa từ item._id thành item.id
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
                    defaultCurrent={1} 
                    current={currentPage} 
                    total={pages * 10} 
                    onChange={HandleChangePage}
                />
            </div>
       </div>
    );
}

export default ListProduct;
