import {
  Grid,
  Typography,
  Divider,
  Button,
  Chip,
  Hidden,
} from "@material-ui/core";
import React, { useEffect } from "react";
import CustomCard from "../components/CustomCard";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import colors from "../utils/Colors";
import styles from "../utils/Styles";
import { fetchOrders } from "../actions/orderAction";
import CustomAlert from "../components/CustomAlert";
import Moment from "react-moment";
import OrderShimmer from "../shimmers/OrderShimmer";
import HelmetComponent from "../components/HelmetComponent";

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
    color: colors.main,
    fontSize: 14,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  qty: {
    fontSize: 14,
  },
});
const OrderScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, orders } = useSelector((state) => state.ordersFetch);

  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(fetchOrders());
    }
  }, [userInfo, dispatch, history]);

  return (
    <>
      <HelmetComponent title="Orders: Stiga outwear" />
      {loading ? (
        <OrderShimmer />
      ) : error ? (
        <CustomAlert message={error} type="error" />
      ) : orders.length > 0 ? (
        <>
          <Typography variant="h6">My Orders</Typography>
          {orders.map((orderItem) => (
            <>
              <br />
              <CustomCard>
                <div className={classes.orderHeader}>
                  <div className={classes.orderHeaderLeft}>
                    <Typography className={classes.orderNumber}>
                      Order #: {orderItem._id}
                    </Typography>
                    <Typography className={classes.orderDate}>
                      <Moment
                        date={Number(orderItem.createdAt)}
                        format="DD-MM-YYYY hh:mm:ss"
                      />
                    </Typography>
                  </div>
                  <Button
                    size="small"
                    className={classes.view}
                    onClick={() =>
                      history.push(`/order/${orderItem._id}?redirect=orders`)
                    }
                  >
                    view
                  </Button>
                </div>
                <Divider />
                <br />
                {orderItem.selectedItems.map((item) => (
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={6} sm={2}>
                      <Link
                        className={classes.itemLink}
                        to={`/product/${item.product}?redirect=orders`}
                      >
                        <img src={item.image} width="100%" alt={item.name} />
                      </Link>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Link
                        className={classes.itemLink}
                        to={`/product/${item.product}?redirect=orders`}
                      >
                        {item.name}
                      </Link>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <Typography className={classes.qty}>
                        Qty: {" " + item.qty}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={2}>
                      <Chip
                        size="small"
                        label={orderItem.isPaid ? "Paid" : "Not paid"}
                        color={orderItem.isPaid ? "primary" : "secondary"}
                      />
                    </Grid>
                    <Grid item xs={5} sm={3}>
                      <Chip
                        size="small"
                        label={
                          orderItem.isDelivered ? "Delivered" : "Not Delivered"
                        }
                        variant="outlined"
                        color={orderItem.isPaid ? "primary" : "secondary"}
                      />
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
          ))}
        </>
      ) : (
        <>
          <br />
          <br />
          <Typography align="center">You got no orders</Typography>
        </>
      )}
    </>
  );
};

export default OrderScreen;
