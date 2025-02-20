import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrderPendding } from "../../../../actions/OrderAction";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import {
  AppstoreOutlined,
  UsergroupAddOutlined,
  ShopOutlined,
  OrderedListOutlined,
  WechatOutlined,
} from "@ant-design/icons";

function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();

  // ✅ Kiểm tra nếu reducer có orderPendding
  const orderPendding = useSelector((state) => state.allOrder?.orderPendding || []);

  useEffect(() => {
    dispatch(GetAllOrderPendding()); // ✅ Gọi API lấy đơn hàng đang chờ
  }, [dispatch]);

  return (
    <div className="sidebar">
      <div className="sidebar-top">
      <div className="dashboard-top-content-avatar">
  <span style={{ fontSize: '20px', fontWeight: '700', color: '#d70018' }}>POS</span>
</div>

      </div>
      <div className="sidebar-list">
        <Link to="/admin" className="sidebar-list-item">
          <span>
            <AppstoreOutlined />
          </span>
          <p>Dashboard</p>
        </Link>
        <Link to="/admin/customer" className="sidebar-list-item">
          <span>
            <UsergroupAddOutlined />
          </span>
          <p>Customer</p>
        </Link>
        <Link to="/admin/product" className="sidebar-list-item">
          <span>
            <ShopOutlined />
          </span>
          <p>Products</p>
        </Link>
        <Link to="/admin/order" className="sidebar-list-item">
          <span>
            <OrderedListOutlined />
          </span>
          <p>
            Order
            {orderPendding.length > 0 && (
              <div className="admin-order-new">{orderPendding.length}</div>
            )}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
