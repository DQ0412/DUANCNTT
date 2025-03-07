import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginationProduct } from "../../../../actions/ProductAction";
import { Link } from "react-router-dom";
import ListProduct from "./ListProduct";
import "./AdminProduct.css";
import { AppstoreAddOutlined, ToolOutlined } from "@ant-design/icons";

function AdminProduct(props) {
  const dispatch = useDispatch();

  // Lấy currentPage từ Redux (đảm bảo không undefined)
  const currentPage = useSelector((state) => state.allProduct.currentPage) || 1;

  // Kiểm tra `product` có phải là mảng không, nếu không gán giá trị mặc định là []
  const products = useSelector((state) => state.allProduct.productList) || [];

  useEffect(() => {
    //console.log("🚀 Dispatch API và kiểm tra dữ liệu trước khi render");
    dispatch(paginationProduct(currentPage));
  }, [dispatch, currentPage]);
  
  /*useEffect(() => {
    console.log("Dữ liệu sản phẩm nhận được từ Redux:", products);
  }, [products]);*/
  
  return (
    <div className="admin-product">
      <div className="admin-product-link">
        <Link to="/admin/product/create" className="add-product">
          <AppstoreAddOutlined />
        </Link>
        <Link to="/admin/product/update/info" className="add-product">
          <ToolOutlined />
        </Link>
      </div>

      {/* Kiểm tra sản phẩm có tồn tại trước khi render */}
      {products.length > 0 ? (
        <ListProduct listProducts={products} />
      ) : (
        <p>Không có sản phẩm</p>
      )}
    </div>
  );
}

export default AdminProduct;
