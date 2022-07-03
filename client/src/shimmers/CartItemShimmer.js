import { Card, CardContent, Grid } from "@material-ui/core";
import React from "react";
import { ShimmerButton } from "react-shimmer-effects";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 14,
    padding: 5,
  },
});

const CartItemShimmer = () => {
  const classes = useStyles();

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item className={classes.gridItem} xs={6} sm={1}>
              <ShimmerButton size="md" />
            </Grid>
            <Grid item className={classes.gridItem} xs={6} sm={1}>
              <ShimmerButton size="md" />
            </Grid>
            <Grid item className={classes.gridItem} xs={3} sm={3}>
              <ShimmerButton size="md" />
            </Grid>
            <Grid item className={classes.gridItem} xs={3} sm={2}>
              <ShimmerButton size="md" />
            </Grid>
            <Grid item className={classes.gridItem} xs={3} sm={4}>
              <ShimmerButton size="md" />
            </Grid>
            <Grid item className={classes.gridItem} xs={3} sm={1}>
              <ShimmerButton size="md" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartItemShimmer;
