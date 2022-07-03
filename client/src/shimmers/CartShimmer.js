import { Grid, Hidden } from "@material-ui/core";
import React from "react";
import CartCheckoutShimmer from "./CartCheckoutShimmer";
import CartItemShimmer from "./CartItemShimmer";

const CartShimmer = () => {
  return (
    <Grid container spacing={2}>
      <Hidden smUp>
        <Grid xs={12}>
          <CartCheckoutShimmer />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={8}>
        <CartItemShimmer />
        <CartItemShimmer />
        <CartItemShimmer />
        <CartItemShimmer />
      </Grid>
      <Hidden xsDown>
        <Grid sm={4}>
          <CartCheckoutShimmer />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default CartShimmer;
