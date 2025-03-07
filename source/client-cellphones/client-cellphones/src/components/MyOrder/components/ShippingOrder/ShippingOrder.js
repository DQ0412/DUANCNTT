import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderShippingByUser } from "../../../../actions/OrderAction";
import OrderList from '../AllOrder/OrderList';

function ShippingOrder() {
  const dispatch = useDispatch();
  const { myOrdersShipping = [] } = useSelector((state) => state.orderByUser);
  const { userInfo } = useSelector((state) => state.userSignin || {});

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(getOrderShippingByUser(userInfo._id));
    }
  }, [dispatch, userInfo]);

  return <OrderList orders={myOrdersShipping} />;
}

export default ShippingOrder;
