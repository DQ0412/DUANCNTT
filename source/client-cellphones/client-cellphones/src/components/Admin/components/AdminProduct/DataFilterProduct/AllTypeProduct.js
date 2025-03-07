import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTypeProduct, getAllTypeProduct } from "../../../../../actions/ListTypeProductAction";
export default function AllTypeProduct() {
    const dispatch = useDispatch();
    const { List } = useSelector((state) => state.allTypeProduct) || { List: [] };

    useEffect(() => {
        dispatch(getAllTypeProduct());
    }, [dispatch]);

    return (
        <div className="filter-menu-firm">
            {List.length > 0 ? (
                List.map((item) => (
                    <div key={item._id} className="filter-menu-firm-item">
                        <span>{item.name}</span>
                        <button onClick={() => dispatch(deleteTypeProduct(item._id))}>Xóa</button>
                    </div>
                ))
            ) : (
                <p>Không có dữ liệu</p>
            )}
        </div>
    );
}
