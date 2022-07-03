import {
  Grid,
  Typography,
  IconButton,
  Container,
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
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import colors from "../utils/Colors";
import styles from "../utils/Styles";
import { Delete, Person, Mail, Phone, Home, Payment } from "@material-ui/icons";
import ShoppingStepper from "../components/ShoppingStepper";
import { removeFromCart } from "../actions/cartAction";
import { createOrder } from "../actions/orderAction";
import CustomAlert from "../components/CustomAlert";
import PlaceOrderShimmer from "../shimmers/PlaceOrderShimmer";
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
    color: colors.main,

    "&:hover": {
      textDecoration: "underline",
    },
  },
  deleteBtn: {
    ...styles.buttonStyle,
  },
  checkoutBtn: {
    ...styles.buttonStyle,
    background: colors.main,
  },
  spaceBtw: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 5px",
  },
});

const PlaceOrderScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.getCart);
  const { shippingInfo } = useSelector((state) => state.shippingInfo);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, order } = useSelector((state) => state.orderCreate);
  const history = useHistory();
  const [total, setTotal] = useState(0);
  // eslint-disable-next-line
  const [shippingPrice, setShippingPrice] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (!userInfo || cartItems.length === 0 || !shippingInfo) {
      history.push("/cart");
    }

    let totalPrice = 0;
    let checkoutItems = [];
    cartItems.forEach((item) => {
      if (item.selected) {
        totalPrice += item.price * item.qty;
        checkoutItems.push(item);
      }
    });
    setTotal(totalPrice);
    setSelectedItems(checkoutItems);

    if (order) {
      history.push(`/orders`);
    }
    // eslint-disable-next-line
  }, [history, userInfo, cartItems, shippingInfo, order]);

  const labels = [
    {
      label: "Sign In",
    },
    {
      label: "Shipping",
    },
    {
      label: "Payment",
    },
    {
      label: "Place Order",
    },
  ];

  const proceedToPay = () => {
    const billingInfo = {
      ...shippingInfo,
      address: shippingInfo.defaultAddress,
      city: "Dhaka",
    };
    const data = {
      selectedItems,
      shippingInfo: billingInfo,
      paymentMethod: shippingInfo.paymentMethod,
      totalPrice: total,
      shippingPrice,
    };
    dispatch(createOrder(data));
  };

  return (
    <Container>
      <HelmetComponent title="Place Order: Stiga outwear" />
      <ShoppingStepper lables={labels} currentStep={4} />
      <br />
      {loading ? (
        <PlaceOrderShimmer />
      ) : error ? (
        <CustomAlert message={error} type="error" />
      ) : (
        cartItems.length > 0 &&
        shippingInfo && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <CustomCard>
                <Grid container spacing={2}>
                  {selectedItems.map((item) => (
                    <>
                      <Grid item className={classes.gridItem} xs={6} sm={3}>
                        <Link
                          className={classes.itemLink}
                          to={`/product/${item.product}`}
                        >
                          <img src={item.image} width="100%" alt={item.name} />
                        </Link>
                      </Grid>
                      <Grid item className={classes.gridItem} xs={6} sm={3}>
                        <Link
                          className={classes.itemLink}
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </Grid>

                      <Grid item className={classes.gridItem} xs={4} sm={2}>
                        GMD{" " + item.price.toFixed(2)}
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
                      <Grid item className={classes.gridItem} xs={4} sm={2}>
                        <IconButton
                          onClick={() => dispatch(removeFromCart(item._id))}
                          className={classes.deleteBtn}
                          size="small"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </CustomCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomCard>
                <div className={classes.spaceBtw}>
                  <Button
                    className={classes.checkoutBtn}
                    color="primary"
                    variant="contained"
                    title="Update"
                    size="small"
                    fullWidth
                    onClick={proceedToPay}
                  >
                    Place Order
                  </Button>
                </div>
                <Typography>ORDER SUMMARY</Typography>

                <div className={classes.spaceBtw}>
                  <Typography>SubTotal ({selectedItems.length})</Typography>
                  <Typography>
                    GMD
                    {" " +
                      Math.ceil(
                        selectedItems.reduce(
                          (acc, item) => acc + item.qty * item.price,
                          0
                        )
                      )}
                  </Typography>
                </div>

                <div className={classes.spaceBtw}>
                  <Typography>Shipping Fee</Typography>
                  <Typography>GMD{" " + shippingPrice.toFixed(2)}</Typography>
                </div>

                <div className={classes.spaceBtw}>
                  <Typography>Total</Typography>
                  <Typography>GMD{" " + total.toFixed(2)}</Typography>
                </div>

                <Divider />
                <br />
                <Typography>BILLING INFO</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Payment />
                    </ListItemIcon>
                    <ListItemText>{shippingInfo.paymentMethod}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText>{shippingInfo.name}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Mail />
                    </ListItemIcon>
                    <ListItemText>{shippingInfo.email}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText>{shippingInfo.phone}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText>{shippingInfo.defaultAddress}</ListItemText>
                  </ListItem>
                </List>
                <div className={classes.spaceBtw}>
                  <Button
                    className={classes.checkoutBtn}
                    color="primary"
                    variant="contained"
                    title="Update"
                    size="small"
                    fullWidth
                    onClick={proceedToPay}
                  >
                    Place Order
                  </Button>
                </div>
              </CustomCard>
            </Grid>
          </Grid>
        )
      )}
    </Container>
  );
};

export default PlaceOrderScreen;
