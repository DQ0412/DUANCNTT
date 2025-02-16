import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  editCurrentPage,
  saveProduct,
} from "../../../../actions/ProductAction";
import { useHistory } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import { getAllTypeProduct } from "../../../../actions/ListTypeProductAction";

function AdminCreate(props) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const [activeTypeProduct, setActiveTypeproduct] = useState("");

  const SelectList = useSelector(state => state.selectList?.List || []);
  const pages = useSelector(state => state.allProduct?.product?.pages || 1);
  const List = useSelector(state => state.allTypeProduct?.List || []);

  useEffect(() => {
    dispatch(getAllSelectList());
    dispatch(getAllTypeProduct());
  }, [dispatch]);

  const handleFileImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const HandleFilterProductByType = (name) => {
    setActiveTypeproduct(name);
  };

  const onSubmit = async (data) => {
    if (!activeTypeProduct) {
      alert("Vui lòng chọn loại sản phẩm.");
      return;
    }

    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append("type", activeTypeProduct);
    if (image) formData.append("image", image);

    formData.append("os", data.os || "");
    formData.append("ram", data.ram || "");
    formData.append("battery", data.battery || "");
    formData.append("rom", data.rom || "");
    formData.append("camera", data.camera || "");
    formData.append("special", data.special || "");
    formData.append("design", data.design || "");
    formData.append("screen", data.screen || "");

    await dispatch(saveProduct(formData));
    await dispatch(editCurrentPage(pages));
    history.push("/admin/product");
  };

  return (
    <div className="admin-create">
      <span>Create Product</span>
      <form className="admin-create-product" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        <input {...register("amount")} placeholder="Amount" type="number" />
        <input {...register("price")} placeholder="Price" type="number" />
        <input {...register("salePrice")} placeholder="Sale Price" type="number" />

        <div className="filter-menu-firm">
          {List.map((item) => (
            <div key={item.id} className={`filter-menu-firm-item ${activeTypeProduct === item.name ? "active" : ""}`} onClick={() => HandleFilterProductByType(item.name)}>
              <img src={item.img} alt={item.name} />
            </div>
          ))}
        </div>

        <input type="file" {...register("image")} onChange={handleFileImageChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminCreate;
