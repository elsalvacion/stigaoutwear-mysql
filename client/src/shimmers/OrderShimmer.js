import { Typography } from "@material-ui/core";
import React from "react";

import OrderItemShimmer from "./OrderItemShimmer";

const OrderShimmer = () => {
  const orders = [1, 1, 1, 1];
  return (
    <>
      <Typography variant="h6">My Orders</Typography>
      <br />
      {orders.map(() => (
        <OrderItemShimmer />
      ))}
    </>
  );
};

export default OrderShimmer;
