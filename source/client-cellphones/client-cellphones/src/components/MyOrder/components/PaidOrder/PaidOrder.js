import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderPaidByUser } from "../../../../actions/OrderAction";
import OrderList from '../AllOrder/OrderList';

function PaidOrder() {
  const dispatch = useDispatch();
  const { myOrdersPaid = [] } = useSelector((state) => state.orderByUser);
  const { userInfo } = useSelector((state) => state.userSignin || {});

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(getOrderPaidByUser(userInfo._id));
    }
  }, [dispatch, userInfo]);

  return <OrderList orders={myOrdersPaid} />;
}

export default PaidOrder;
