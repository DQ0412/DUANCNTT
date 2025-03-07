import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CreateNewTypeProduct } from "../../../../../actions/ListTypeProductAction";

export default function CreateNewType() {
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        await dispatch(CreateNewTypeProduct(data));
    };

    return (
        <div className="create-type">
            <span>Tạo loại sản phẩm mới</span>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name")} placeholder="Tên loại sản phẩm" required />
                <button type="submit">Thêm</button>
            </form>
        </div>
    );
}
