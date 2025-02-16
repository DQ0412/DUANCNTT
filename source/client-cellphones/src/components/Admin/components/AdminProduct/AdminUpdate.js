import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductById,
  removeProductById,
  saveProduct,
} from "../../../../actions/ProductAction";
import { useHistory, useParams } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";

function AdminUpdate(props) {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const detailProduct = useSelector((state) => state.productReducer?.product || {});
  const SelectList = useSelector((state) => state.selectList?.List || []);
  const [activeTypeProduct, setActiveTypeProduct] = useState(undefined);
  const { List } = useSelector((state) => state.allTypeProduct || {});

  useEffect(() => {
    dispatch(getProductById(id));

    return () => {
      dispatch(removeProductById());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  const handleFileImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append("type", activeTypeProduct ? activeTypeProduct : detailProduct.type);
    
    if (image) {
      formData.append("image", image);
    }
    
    formData.append("id", id);
    formData.append("os", data.os);
    formData.append("ram", data.ram);
    formData.append("battery", data.battery);
    formData.append("rom", data.rom);
    formData.append("camera", data.camera);
    formData.append("special", data.special);
    formData.append("design", data.design);
    formData.append("screen", data.screen);

    await dispatch(saveProduct(formData));
    history.push("/admin/product");
  };

  const MenuFirmProduct = (item) => (
    <div
      key={item.name}
      className={
        activeTypeProduct
          ? activeTypeProduct === item.name
            ? `filter-menu-firm-item active`
            : "filter-menu-firm-item"
          : detailProduct.type === item.name
          ? `filter-menu-firm-item active`
          : "filter-menu-firm-item"
      }
      onClick={() => handleFilterProductByType(item.name)}
    >
      <img src={item.img} alt={item.name} />
    </div>
  );

  const handleFilterProductByType = (name) => {
    setActiveTypeProduct(name);
  };

  return (
    <div className="admin-create">
      <span>Update Product</span>
      {detailProduct ? (
        <form
          className="admin-create-product"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <input
            {...register("name")}
            placeholder="Name"
            defaultValue={detailProduct.name}
          />
          <input
            {...register("amount")}
            placeholder="Amount"
            type="number"
            defaultValue={detailProduct.amount}
          />
          <input
            {...register("price")}
            placeholder="Price"
            type="number"
            defaultValue={detailProduct.price}
          />
          <input
            {...register("salePrice")}
            placeholder="Sale Price"
            type="number"
            defaultValue={detailProduct.salePrice}
          />

          <div className="filter-menu-firm">
            {Array.isArray(List) && List.length > 0 ? List.map((item) => MenuFirmProduct(item)) : ""}
          </div>

          {SelectList && SelectList.length > 0
            ? SelectList.map((item) => (
                <div className="select-type" key={item.property}>
                  <select
                    {...register(`${item.property}`)}
                    defaultValue={detailProduct[`${item.property}`]}
                  >
                    {item.options.map((x) => (
                      <option key={x} value={x}>{x}</option>
                    ))}
                  </select>
                </div>
              ))
            : ""}

          <input type="file" {...register("image")} onChange={handleFileImageChange} />
          <button type="submit">Update Product</button>
        </form>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default AdminUpdate;
