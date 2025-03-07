import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderPenddingByUser,
  getOrderShippingByUser,
} from "../../../actions/OrderAction";

function MenuOrder() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.userSignin);
  // Sử dụng giá trị mặc định nếu state.orderByUser undefined
  const { myOrdersPendding, myOrdersShipping } = useSelector(
    (state) => state.orderByUser || { myOrdersPendding: [], myOrdersShipping: [] }
  );

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(getOrderPenddingByUser(userInfo._id));
      dispatch(getOrderShippingByUser(userInfo._id));
    }
  }, [dispatch, userInfo]);

  return (
    <div className="myorder-menu">
      <div className={location.pathname === '/myOrder' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to="/myOrder">Tất cả</Link>
      </div>
      <div className={location.pathname === '/myOrder/pendding' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to="/myOrder/pendding">Chờ xử lí</Link>
        {myOrdersPendding && myOrdersPendding.length > 0 && (
          <div className="myorder-menu-item-newPendding">
            {myOrdersPendding.length}
          </div>
        )}
      </div>
      <div className={location.pathname === '/myOrder/shipping' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to="/myOrder/shipping">Đang giao</Link>
        {myOrdersShipping && myOrdersShipping.length > 0 && (
          <div className="myorder-menu-item-newShipping">
            {myOrdersShipping.length}
          </div>
        )}
      </div>
      <div className={location.pathname === '/myOrder/paid' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to="/myOrder/paid">Đã giao</Link>
      </div>
    </div>
  );
}

export default MenuOrder;
