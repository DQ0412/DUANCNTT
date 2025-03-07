import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getProductById, removeProductById, updateProduct } from "../../../../actions/ProductAction";
import { useHistory, useParams } from "react-router-dom";
import { getAllTypeProduct } from "../../../../actions/ListTypeProductAction";

function AdminUpdate() {
  const { register, handleSubmit } = useForm();
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState(null);
  const [activeTypeProduct, setActiveTypeProduct] = useState(null);

  // ✅ Lấy sản phẩm từ Redux
  const detailProduct = useSelector((state) => state.getProductById?.product || {});
  const List = useSelector((state) => state.allTypeProduct?.List || []);

  // ✅ Gọi API lấy sản phẩm theo ID khi component mount
  useEffect(() => {
    console.log(`🚀 Gửi request lấy sản phẩm ID: ${id}`);
    dispatch(getProductById(id));
    return () => {
      dispatch(removeProductById()); // Cleanup tránh rò rỉ dữ liệu
    };
  }, [dispatch, id]);

  // ✅ Gọi API lấy danh sách loại sản phẩm
  useEffect(() => {
    dispatch(getAllTypeProduct());
  }, [dispatch]);

  useEffect(() => {
    if (detailProduct && detailProduct.type_id) {
      setActiveTypeProduct(detailProduct.type_id);
    }
  }, [detailProduct]);

  const handleFileImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleFilterProductByType = (id) => {
    console.log("✅ Chọn loại sản phẩm, ID:", id);
    setActiveTypeProduct(id);
  };

  // ✅ Xử lý khi submit form cập nhật sản phẩm
  const onSubmit = async (data) => {
    if (!activeTypeProduct) {
      alert("Vui lòng chọn loại sản phẩm.");
      return;
    }

    let formData = new FormData();
    formData.append("id", id);
    formData.append("name", data.name || detailProduct.name);
    formData.append("price", data.price || detailProduct.price);
    formData.append("sale_price", data.sale_price || detailProduct.sale_price);
    formData.append("amount", data.amount || detailProduct.amount);
    formData.append("type_id", activeTypeProduct);

    if (image) formData.append("image", image);

    console.log("📌 Dữ liệu gửi lên:", Object.fromEntries(formData.entries())); // Log lại dữ liệu

    try {
      await dispatch(updateProduct(id, formData));
      history.push("/admin/product");
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <div className="admin-create">
      <h2>Update Product</h2>
      {detailProduct && detailProduct.name ? (
        <form className="admin-create-product" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input {...register("name")} placeholder="Name" defaultValue={detailProduct.name} required />
          <input {...register("amount")} placeholder="Amount" type="number" defaultValue={detailProduct.amount} required />
          <input {...register("price")} placeholder="Price" type="number" defaultValue={detailProduct.price} required />
          <input {...register("sale_price")} placeholder="Sale Price" type="number" defaultValue={detailProduct.sale_price} required />

          {/* ✅ Hiển thị danh sách loại sản phẩm giống AdminCreate.js */}
          <div className="filter-menu-firm">
            {List.length > 0 ? (
              List.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={activeTypeProduct === item.id ? "active" : ""}
                  onClick={() => handleFilterProductByType(item.id)}
                >
                  {item.name}
                </button>
              ))
            ) : (
              <p>Không có loại sản phẩm nào</p>
            )}
          </div>

          <input type="file" onChange={handleFileImageChange} />

          <button type="submit">Update Product</button>
        </form>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default AdminUpdate;
