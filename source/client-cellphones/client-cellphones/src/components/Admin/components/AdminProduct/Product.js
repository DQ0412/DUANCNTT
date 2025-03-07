import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  paginationProduct,
} from "../../../../actions/ProductAction";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../untils/index";
import { DeleteOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";

function Product(props) {
  const { product, number } = props;
  //console.log("🛒 Render sản phẩm:", product);

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.allProduct.currentPage);

  const handleDeleteProduct = async (product) => {
    await dispatch(deleteProduct(product.id));  //  
    dispatch(paginationProduct(currentPage));
  };

  return (
    <tr>
      <td>{number + 1}</td>
      <td>
        <img src={`http://127.0.0.1:8000/storage/${product.image}`} alt={product.name} width="80px"></img>
      </td>
      <td>{product.name}</td>
      <td>{formatPrice(product.sale_price)}</td>  {}
      <td>{product.type}</td>
      <td
        className="delete-product"
        onClick={() => handleDeleteProduct(product)}
      >
        <DeleteOutlined />
      </td>
      <td className="update-product">
        <Link to={`/admin/product/update/${product.id}`}> {}
          <EditOutlined />
        </Link>
      </td>
      <td className="review-product">
        <Link to={`/admin/product/reviewProduct/${product.id}`}>
          <FormOutlined />
        </Link>
      </td>
    </tr>
  );
}

export default Product;
