import React from "react";
import { Switch, Route } from "react-router-dom";
import AllOrder from "./components/AllOrder/AllOrder";
import PendingOrder from "./components/PenddingOrder/PenddingOrder";  // Fix component name to match the folder/component file
import ShippingOrder from "./components/ShippingOrder/ShippingOrder";
import PaidOrder from "./components/PaidOrder/PaidOrder";

function RoutesOrder() {
  return (
    <Switch>
      <Route path="/myOrder/" exact component={AllOrder} />
      <Route path="/myOrder/pendding" component={PendingOrder} /> {/* Corrected spelling */}
      <Route path="/myOrder/shipping" component={ShippingOrder} />
      <Route path="/myOrder/paid" component={PaidOrder} />
    </Switch>
  );
}

export default RoutesOrder;
