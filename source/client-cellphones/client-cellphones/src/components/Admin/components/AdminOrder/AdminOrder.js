import React from "react";
import "./AdminOrder.css";
import AdminOrderMenu from "./AdminOrderMenu/AdminOrderMenu";
import { Switch, Route } from "react-router-dom";
import AdminOrderAll from "./AdminOrderAll/AdminOrderAll";

function AdminOrder() {
  return (
    <div className="order">
      <span>Orders</span>
      <AdminOrderMenu />

      <Switch>
        <Route path="/admin/order" exact component={AdminOrderAll} />
      </Switch>
    </div>
  );
}

export default AdminOrder;
