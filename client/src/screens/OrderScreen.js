import { PayPalButton } from "react-paypal-button-v2";

import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CustomCard from "../components/CustomCard";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, useParams, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import colors from "../utils/Colors";
import styles from "../utils/Styles";
import {
  Person,
  Mail,
  Phone,
  Home,
  Payment,
  ArrowBack,
  AccountBalanceWallet,
  LocalShipping,
} from "@material-ui/icons";
import {
  deliverOrder,
  fetchOrder,
  markOrderPay,
  payOrder,
} from "../actions/orderAction";
import CustomLoader from "../components/CustomLoader";
import CustomAlert from "../components/CustomAlert";
import ShoppingStepper from "../components/ShoppingStepper";
import {
  ORDER_DELIVER_RESET,
  ORDER_MARK_PAY_RESET,
  ORDER_PAY_RESET,
} from "../reducers/types/orderTypes";
import axios from "axios";
import OrderScreenShimmer from "../shimmers/OrderScreenShimmer";
import HelmetComponent from "../components/HelmetComponent";

const useStyles = makeStyles({
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 14,
    padding: 5,
  },
  itemLink: {
    textDecoration: "none",
    color: "black",

    "&:hover": {
      textDecoration: "underline",
    },
  },

  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media(max-width: 500px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    width: "100%",
  },
  spaceBtw: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 5px",
  },
  btn: {
    background: colors.main,
    color: colors.primary,
    marginBottom: 15,

    ...styles.buttonStyle,
  },
  adminOrder: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: "15px 5px",
  },
});

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const OrderScreen = () => {
  let query = useQuery();
  const redirect = query.get("redirect") ? `/${query.get("redirect")}` : "/";

  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, order } = useSelector((state) => state.orderFetch);

  const history = useHistory();
  // eslint-disable-next-line
  const [shippingPrice, setShippingPrice] = useState(10);
  const [sdkReady, setSdkReady] = useState(false);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const { success: markOrderSuccess } = useSelector(
    (state) => state.orderMarkPay
  );

  const { success: markOrderDeliverSuccess } = useSelector(
    (state) => state.orderMarkDeliver
  );

  useEffect(() => {
    if (!userInfo || !id) {
      history.push(`/login`);
    } else {
      dispatch(fetchOrder(id));

      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get("/config/paypal");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };

      if (!order || order._id !== id) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch(fetchOrder(id));
      } else if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
          setSdkReady(true);
        }
      }
    }

    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
    }

    if (markOrderSuccess) {
      dispatch({ type: ORDER_MARK_PAY_RESET });
    }
    if (markOrderDeliverSuccess) {
      dispatch({ type: ORDER_DELIVER_RESET });
    }
    // eslint-disable-next-line
  }, [
    userInfo,
    id,
    dispatch,
    successPay,
    markOrderSuccess,
    markOrderDeliverSuccess,
    history,
  ]);

  const labels = [
    {
      label: "Order Placed",
    },
    {
      label: "Paid",
    },
    {
      label: "Delivered",
    },
  ];

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  const handlePay = () => {
    dispatch(markOrderPay(id));
  };

  const handleDeliver = () => {
    dispatch(deliverOrder(id));
  };

  return (
    <>
      <HelmetComponent title="Order" />
      {loading ? (
        <OrderScreenShimmer />
      ) : error ? (
        <CustomAlert message={error} type="error" />
      ) : (
        order && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                className={classes.btn}
                variant="contained"
                startIcon={<ArrowBack fontSize="small" />}
                onClick={() => history.push(redirect)}
                size="small"
              >
                BACK
              </Button>
            </Grid>
            <Grid item xs={12}>
              <HelmetComponent title={"Order: " + order._id} />

              <ShoppingStepper
                lables={labels}
                currentStep={
                  order.isPaid && !order.isDelivered
                    ? 2
                    : order.isPaid && order.isDelivered
                    ? 3
                    : 1
                }
              />
              <br />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomCard>
                {userInfo && userInfo.isAdmin && (
                  <div className={classes.adminOrder}>
                    {order.paymentMethod === "COD" && !order.isPaid ? (
                      <Button
                        className={classes.btn}
                        variant="contained"
                        startIcon={<AccountBalanceWallet fontSize="small" />}
                        onClick={handlePay}
                        size="small"
                      >
                        Mark As Paid
                      </Button>
                    ) : order.paymentMethod === "Bank Transfer" &&
                      !order.isPaid ? (
                      <Button
                        className={classes.btn}
                        variant="contained"
                        startIcon={<AccountBalanceWallet fontSize="small" />}
                        onClick={handlePay}
                        size="small"
                      >
                        Mark As Paid
                      </Button>
                    ) : null}
                    {!order.isDelivered && order.isPaid && (
                      <Button
                        className={classes.btn}
                        variant="contained"
                        startIcon={<LocalShipping fontSize="small" />}
                        onClick={handleDeliver}
                        size="small"
                      >
                        Mark as Delivered
                      </Button>
                    )}
                  </div>
                )}
                <>
                  {order.paymentMethod === "Bank Transfer" && !order.isPaid && (
                    <>
                      <Typography>Bank Info</Typography>
                      <List>
                        <ListItem>
                          <ListItemText>Bank Name: GT bank</ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemText>
                            Account Name: Mustapha Njie
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemText>
                            Account Number: 209 509669 1730
                          </ListItemText>
                        </ListItem>
                      </List>
                      <br />
                      <Divider />
                      <br />
                    </>
                  )}

                  {order.paymentMethod === "PayPal" && !order.isPaid && (
                    <>
                      {loadingPay && <CustomLoader />}
                      {!sdkReady && (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                      <br />
                      <Divider />
                      <br />
                    </>
                  )}
                </>

                <Typography>ORDER SUMMARY</Typography>

                <div className={classes.spaceBtw}>
                  <Typography>
                    SubTotal ({order.selectedItems.length})
                  </Typography>
                  <Typography>
                    GMD{" "}
                    {Math.ceil(
                      order.selectedItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )
                    )}
                  </Typography>
                </div>

                <div className={classes.spaceBtw}>
                  <Typography>Shipping Fee</Typography>
                  <Typography>GMD{" " + shippingPrice}</Typography>
                </div>

                <div className={classes.spaceBtw}>
                  <Typography>Total</Typography>
                  <Typography>
                    GMD{" "}
                    {Math.ceil(
                      order.selectedItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      ) + shippingPrice
                    )}
                  </Typography>
                </div>

                <Divider />
                <br />
                <Typography>BILLING INFO</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Payment />
                    </ListItemIcon>
                    <ListItemText>
                      {order.paymentMethod === "COD"
                        ? "Cash on Delivery"
                        : order.paymentMethod}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText>{order.name}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Mail />
                    </ListItemIcon>
                    <ListItemText>{order.email}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText>{order.shippingInfo.phone}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText>
                      {order.shippingInfo.address},{" "}
                      {" " + order.shippingInfo.city}.
                    </ListItemText>
                  </ListItem>
                </List>
              </CustomCard>
            </Grid>
            <Grid item xs={12} md={8}>
              <CustomCard>
                <Grid container spacing={2}>
                  <Grid item className={classes.orderHeader} xs={12}>
                    <Typography>ORDER ID</Typography>
                    <Typography>{order._id}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {order.selectedItems.map((item) => (
                    <>
                      <Grid item className={classes.gridItem} xs={6} sm={3}>
                        <Link
                          className={classes.itemLink}
                          to={`/product/${item.product}?redirect=order/${id}`}
                        >
                          <img src={item.image} width="100%" alt={item.name} />
                        </Link>
                      </Grid>
                      <Grid item className={classes.gridItem} xs={6} sm={3}>
                        <Link
                          className={classes.itemLink}
                          to={`/product/${item.product}?redirect=order/${id}`}
                        >
                          {item.name}
                        </Link>
                      </Grid>
                      <Grid item className={classes.gridItem} xs={4} sm={2}>
                        GMD{" " + item.price}
                      </Grid>

                      <Grid item className={classes.gridItem} xs={4} sm={2}>
                        {" " + item.size}
                      </Grid>
                      <Grid
                        item
                        className={classes.gridItem}
                        alignItems="center"
                        justifyContent="center"
                        xs={4}
                        sm={2}
                      >
                        Qty: {" " + item.qty}
                      </Grid>
                    </>
                  ))}
                </Grid>
              </CustomCard>
            </Grid>
          </Grid>
        )
      )}
    </>
  );
};

export default OrderScreen;
