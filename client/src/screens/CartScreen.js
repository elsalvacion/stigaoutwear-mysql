import {
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
  ListItemText,
  Button,
  Checkbox,
  Hidden,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  editQuantity,
  updateCart,
  getCart,
} from "../actions/cartAction";
import { Link, useHistory } from "react-router-dom";
import { Delete, RemoveShoppingCart } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import colors from "../utils/Colors";
import Quantity from "../components/Quantity";
import SnackNotice from "../components/SnackNotice";
import { useEffect } from "react";
import {
  EDIT_QTY_RESET,
  REMOVE_CART_RESET,
  UPDATE_CART_RESET,
} from "../reducers/types/cartTypes";
import CustomAlert from "../components/CustomAlert";
import CartShimmer from "../shimmers/CartShimmer";
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
  deleteBtn: {
    color: colors.main,

    "&:hover": {
      backgroundColor: colors.main,
      color: colors.primary,
    },
    /*
    Ripple effect help from 
    https://stackoverflow.com/questions/56169750/change-ripple-color-on-click-of-material-ui-button 
    */
    "& .MuiTouchRipple-root span": {
      backgroundColor: `${colors.main} !important`,
      opacity: 0.3,
    },
  },
  checkoutBtn: {
    color: colors.primary,

    "&:hover": {
      backgroundColor: colors.main,
    },
    /*
    Ripple effect help from 
    https://stackoverflow.com/questions/56169750/change-ripple-color-on-click-of-material-ui-button 
    */
    "& .MuiTouchRipple-root span": {
      backgroundColor: `${colors.main} !important`,
      opacity: 0.3,
    },
    background: colors.main,
  },

  // checkbtn
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
  },
  checkedIcon: {
    backgroundColor: colors.main,
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: colors.main,
    },
  },
});

const CartScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItems, loading, error, success } = useSelector(
    (state) => state.getCart
  );

  const { loading: updateCartLoading, success: updateCartSuccess } =
    useSelector((state) => state.updateCart);
  const { loading: removeCartLoading, success: removeCartSuccess } =
    useSelector((state) => state.removeCart);

  const { loading: editQtyLoading, success: editQtySuccess } = useSelector(
    (state) => state.editQty
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  // const [checkout, setCheckout] = useState([]);
  const [subTotal, setSubTotatl] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login`);
    } else {
      if (!success) {
        dispatch(getCart());
      }

      let totalPrice = 0;
      let checkoutItems = 0;
      cartItems.forEach((item) => {
        if (item.selected) {
          totalPrice += item.price * item.qty;
          checkoutItems += 1;
        }
      });
      setSubTotatl(totalPrice);
      setSelected(checkoutItems);
    }

    if (updateCartSuccess) {
      dispatch({ type: UPDATE_CART_RESET });
    }
    if (editQtySuccess) {
      dispatch({ type: EDIT_QTY_RESET });
    }

    if (removeCartSuccess) {
      dispatch({ type: REMOVE_CART_RESET });
      setRemoveSnack(true);
    }
    if (
      document
        .querySelector(".searchResultContainer")
        .classList.contains("show")
    )
      document.querySelector(".searchResultContainer").classList.remove("show");
  }, [
    dispatch,
    updateCartSuccess,
    removeCartSuccess,
    cartItems,
    userInfo,
    editQtySuccess,
    history,
    error,
    success,
  ]);

  let [removeSnack, setRemoveSnack] = useState(false);

  const handleNewQuantity = (qty, i) => {
    // setCheckout([]);
    dispatch(editQuantity(cartItems[i]._id, qty));
  };
  return loading || updateCartLoading || removeCartLoading || editQtyLoading ? (
    <CartShimmer />
  ) : error ? (
    <CustomAlert message={error} type="error" />
  ) : (
    <>
      <HelmetComponent title="Cart: Stiga outwear" />
      {removeSnack && (
        <SnackNotice
          message={`Item removed from chart`}
          handleSnackClose={() => setRemoveSnack(false)}
          align={{ vertical: "bottom", horizontal: "right" }}
        />
      )}
      <Grid container>
        <Hidden smUp>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography>
                  Selected items(
                  {selected})
                </Typography>

                {cartItems.length > 0 && (
                  <List>
                    <ListItem>
                      <ListItemText>
                        Subtotal: {"GMD " + subTotal.toFixed(2)}
                      </ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemText>
                        <Typography>
                          Total: {"GMD " + Math.ceil(subTotal)}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    {/* <ListItem> */}
                    <Button
                      className={classes.checkoutBtn}
                      variant="contained"
                      endIcon={<RemoveShoppingCart />}
                      onClick={() => history.push("/login?redirect=shipping")}
                      disabled={selected === 0}
                    >
                      Checkout
                    </Button>
                    {/* </ListItem> */}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8}>
          <>
            <Typography variant="h5">Shopping Cart</Typography>
            <List>
              {cartItems.length > 0 ? (
                cartItems.map((item, i) => (
                  <ListItem key={item._id}>
                    <Grid container>
                      <Hidden xsDown>
                        <Grid item className={classes.gridItem} xs={1}>
                          <Checkbox
                            onChange={(e) =>
                              dispatch(
                                updateCart(item.product, {
                                  ...item,
                                  selected: e.target.checked,
                                })
                              )
                            }
                            checkedIcon={
                              <span className={classes.checkedIcon} />
                            }
                            checked={item.selected}
                          />
                        </Grid>
                        <Grid item className={classes.gridItem} xs={1}>
                          <Link
                            className={classes.itemLink}
                            to={`/product/${item.product}?redirect=cart`}
                          >
                            <img
                              src={item.image}
                              width="100%"
                              alt={item.name}
                            />
                          </Link>
                        </Grid>
                        <Grid item className={classes.gridItem} xs={2}>
                          <Link
                            to={`/product/${item.product}?redirect=cart`}
                            className={classes.itemLink}
                          >
                            {item.name}
                          </Link>
                        </Grid>
                        <Grid item className={classes.gridItem} xs={1}>
                          <Typography className={classes.itemLink}>
                            {item.size}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.gridItem} xs={2}>
                          {"GMD " + item.price}
                        </Grid>
                        <Grid
                          item
                          className={classes.gridItem}
                          alignItems="center"
                          justifyContent="center"
                          xs={4}
                        >
                          <Quantity
                            handleNewQuantity={handleNewQuantity}
                            index={i}
                            quantity={item.qty}
                            product={item}
                          />
                        </Grid>
                        <Grid item className={classes.gridItem} xs={1}>
                          <IconButton
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className={classes.deleteBtn}
                            size="small"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Hidden>
                      <Hidden smUp>
                        <Grid item className={classes.gridItem} xs={6}>
                          <Link
                            className={classes.itemLink}
                            to={`/product/${item.product}?redirect=cart`}
                          >
                            <img
                              src={item.image}
                              width="100%"
                              alt={item.name}
                            />
                          </Link>
                        </Grid>
                        <Grid item className={classes.gridItem} xs={6}>
                          <Link
                            className={classes.itemLink}
                            to={`/product/${item.product}?redirect=cart`}
                          >
                            {item.name}
                          </Link>
                        </Grid>
                        <Grid item className={classes.gridItem} xs={1}>
                          <Checkbox
                            onChange={(e) =>
                              dispatch(
                                updateCart(item.product, {
                                  ...item,
                                  selected: e.target.checked,
                                })
                              )
                            }
                            checkedIcon={
                              <span className={classes.checkedIcon} />
                            }
                            checked={item.selected}
                          />
                        </Grid>
                        <Grid item className={classes.gridItem} xs={3}>
                          ${item.price}
                        </Grid>
                        <Grid item className={classes.gridItem} xs={2}>
                          {item.size}
                        </Grid>
                        <Grid
                          item
                          className={classes.gridItem}
                          alignItems="center"
                          justifyContent="center"
                          xs={4}
                        >
                          <Quantity
                            handleNewQuantity={handleNewQuantity}
                            index={i}
                            quantity={item.qty}
                            product={item}
                          />
                        </Grid>
                        <Grid item className={classes.gridItem} xs={2}>
                          <IconButton
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className={classes.deleteBtn}
                            size="small"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Hidden>
                    </Grid>
                  </ListItem>
                ))
              ) : (
                <Typography>No Item in your cart</Typography>
              )}
            </List>
          </>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={4}>
            <Card>
              <CardContent>
                <Typography>
                  Selected items(
                  {selected})
                </Typography>
                {cartItems.length > 0 && (
                  <List>
                    <ListItem>
                      <ListItemText>
                        Subtotal: {"GMD " + subTotal.toFixed(2)}
                      </ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemText>
                        <Typography>
                          Total: {"GMD " + Math.ceil(subTotal)}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    {/* <ListItem> */}
                    <Button
                      className={classes.checkoutBtn}
                      variant="contained"
                      endIcon={<RemoveShoppingCart />}
                      onClick={() => history.push("/login?redirect=shipping")}
                      disabled={selected === 0}
                    >
                      Checkout
                    </Button>
                    {/* </ListItem> */}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

export default CartScreen;
