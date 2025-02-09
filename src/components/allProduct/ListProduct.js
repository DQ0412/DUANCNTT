import React from 'react';
import Product from './Product';

function ListProduct(props) {
    const { HotSaleProducts } = props;

    console.log("Danh sách sản phẩm nhận được:", HotSaleProducts); // 🔥 Kiểm tra dữ liệu trong Component

    return (
        <div className="hotsale-listproduct">
            {HotSaleProducts && HotSaleProducts.length > 0 ? (
                HotSaleProducts.map((product) => (
                    <Product product={product} key={product.id}></Product>
                ))
            ) : (
                <p>Không có sản phẩm nào!</p>
            )}
        </div>
    );
}

export default ListProduct;
