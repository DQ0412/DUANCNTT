import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../../../actions/UserAction";
import ListUser from "./ListUser";
import { Spin } from "antd";
import "./AdminUser.css";

function AdminUser() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers.users || []);

    //console.log("🟢 Users từ Redux Store:", users); // Debug dữ liệu

    useEffect(() => {
        dispatch(getAllUser()); // Gọi API lấy danh sách người dùng
    }, [dispatch]);

    return (
        <div className="admin-user">
            <h2>Customers</h2>
            {users.length > 0 ? (
                <ListUser users={users} />
            ) : (
                <Spin size="large" tip="Loading Users..." />
            )}
        </div>
    );
}

export default AdminUser;
