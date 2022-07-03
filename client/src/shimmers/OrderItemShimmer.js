import { Grid, Typography, Divider, Hidden } from "@material-ui/core";
import React from "react";
import CustomCard from "../components/CustomCard";
import { makeStyles } from "@material-ui/styles";
import colors from "../utils/Colors";
import styles from "../utils/Styles";

import {
  ShimmerBadge,
  ShimmerButton,
  ShimmerTitle,
} from "react-shimmer-effects";

const useStyles = makeStyles({
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media(max-width: 500px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  orderHeaderLeft: {
    display: "flex",
    flexDirection: "column",
  },
  orderDate: {
    color: "#757575",
    fontSize: 14,
    margin: "10px 0",
  },

  view: {
    ...styles.buttonStyle,
    background: colors.main,
    margin: "10px 0",
  },

  itemLink: {
    textDecoration: "none",
    color: colors.primary,
    fontSize: 14,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  qty: {
    fontSize: 14,
  },
});
const OrderItemShimmer = () => {
  const classes = useStyles();
  const orderItem = [1, 1, 1];
  return (
    <>
      <CustomCard>
        <div className={classes.orderHeader}>
          <ShimmerButton size="md" />
          <ShimmerButton size="md" />
        </div>
        <Divider />
        <br />

        {orderItem.map(() => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={6} sm={2}>
              <ShimmerButton size="lg" />
            </Grid>
            <Grid item xs={6} sm={3}>
              <ShimmerTitle line={1} />
            </Grid>
            <Grid item xs={3} sm={2}>
              <Typography className={classes.qty}>
                <ShimmerTitle line={1} />
              </Typography>
            </Grid>

            <Grid item xs={4} sm={2}>
              <ShimmerBadge width="100%" />
            </Grid>
            <Grid item xs={5} sm={3}>
              <ShimmerBadge width="100%" />
            </Grid>
            <Hidden smUp>
              <Grid item xs={12}>
                <br />
              </Grid>
            </Hidden>
          </Grid>
        ))}
      </CustomCard>
      <br />
    </>
  );
};

export default OrderItemShimmer;
