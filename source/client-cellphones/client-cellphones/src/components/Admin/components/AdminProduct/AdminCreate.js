import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllTypeProduct } from "../../../../actions/ListTypeProductAction";
import { saveProduct } from "../../../../actions/ProductAction";

export default function AdminCreate() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory(); // ✅ Sử dụng useHistory để điều hướng
    const [activeTypeProduct, setActiveTypeProduct] = useState(null);
    const [image, setImage] = useState(null);

    const List = useSelector((state) => state.allTypeProduct?.List || []);

    // 🔹 Gọi API lấy danh sách loại sản phẩm
    useEffect(() => {
        dispatch(getAllTypeProduct());
    }, [dispatch]);

    // 🔹 Log danh sách loại sản phẩm để kiểm tra
    useEffect(() => {
        console.log("🔹 Danh sách loại sản phẩm từ Redux:", List);
    }, [List]);

    const HandleFilterProductByType = (id) => {
        console.log("Loại sản phẩm đã chọn, ID:", id);
        setActiveTypeProduct(id);
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const onSubmit = async (data) => {
        if (!activeTypeProduct) {
            alert("Vui lòng chọn loại sản phẩm.");
            return;
        }

        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("sale_price", data.sale_price);
        formData.append("description", data.description);
        formData.append("screen", data.screen);
        formData.append("chipset", data.chipset);
        formData.append("camera", data.camera);
        formData.append("ram", data.ram);
        formData.append("rom", data.rom);
        formData.append("battery", data.battery);
        formData.append("type_id", activeTypeProduct);

        if (image) {
            formData.append("image", image);
        }

        console.log("📌 Dữ liệu gửi lên API:", Object.fromEntries(formData.entries()));

        try {
            await dispatch(saveProduct(formData));
            history.push("/admin/product"); // ✅ Quay về trang admin/product sau khi tạo thành công
        } catch (error) {
            console.error("❌ Lỗi khi tạo sản phẩm:", error);
        }
    };

    return (
        <div className="admin-create">
            <h2>Create Product</h2>
            <form className="admin-create-product" onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name")} placeholder="Name" required />
                <input {...register("price")} placeholder="Price" type="number" required />
                <input {...register("sale_price")} placeholder="Sale Price" type="number" />
                <textarea {...register("description")} placeholder="Description" required />
                <input {...register("screen")} placeholder="Screen" required />
                <input {...register("chipset")} placeholder="Chipset" required />
                <input {...register("camera")} placeholder="Camera" required />
                <input {...register("ram")} placeholder="RAM" required />
                <input {...register("rom")} placeholder="ROM" required />
                <input {...register("battery")} placeholder="Battery" required />

                {/* ✅ Danh sách loại sản phẩm */}
                <div className="filter-menu-firm">
                    {List.length > 0 ? (
                        List.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className={activeTypeProduct === item.id ? "active" : ""}
                                onClick={() => HandleFilterProductByType(item.id)}
                            >
                                {item.name}
                            </button>
                        ))
                    ) : (
                        <p>Không có loại sản phẩm nào</p>
                    )}
                </div>

                <input type="file" onChange={handleFileChange} />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}
