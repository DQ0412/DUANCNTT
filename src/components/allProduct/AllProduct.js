import React, { useEffect } from 'react';
import ListProduct from './ListProduct';
import './Sale.css';
import { handlePercentDiscount } from '../../untils/index';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../actions/ProductAction';

import FilterProduct from './FilterProduct';
import SortByPrice from './SortByPrice/SortByPrice';

function AllProduct(props) {
    const dispatch = useDispatch();

    // Kiểm tra Redux có đúng dữ liệu không
    const products = useSelector(state => state.allProduct?.productList); // 🔹 Đổi `allProduct.product` thành `productReducer.productList`

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]); // 🔥 Xóa `return () => { return [] }`, không cần thiết

    return (
        <section id="hotsale iphone">
            <div className="hotsale">
                <FilterProduct />
                <SortByPrice />
                {
                    products && products.length > 0 
                    ? <ListProduct HotSaleProducts={handlePercentDiscount(products)} /> 
                    : <span>Không có sản phẩm</span>
                }
            </div>
        </section>
    );
}

export default AllProduct;
