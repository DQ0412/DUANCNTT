import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser } from "../../../../actions/OrderAction";
import OrderList from "./OrderList";

function AllOrder() {
  const dispatch = useDispatch();
  const { allOrders = [] } = useSelector((state) => state.orderByUser);
  const { userInfo } = useSelector((state) => state.userSignin || {});

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(getAllOrdersByUser(userInfo.id));
    }
  }, [dispatch, userInfo]);

  return <OrderList orders={allOrders} />;
}

export default AllOrder;
