import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
  Chip,
  Hidden,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CustomCard from "../components/CustomCard";
import { getUserDetails } from "../actions/userAction";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import styles from "../utils/Styles";
import colors from "../utils/Colors";
import CustomAlert from "../components/CustomAlert";
import UserEdit from "../components/UserEdit";
import ShippingDetailsEdit from "../components/ShippingDetailsEdit";
import { Person, Mail, Phone, Home } from "@material-ui/icons";
import { fetchOrders } from "../actions/orderAction";
import Moment from "react-moment";
import ProfileShimmer from "../shimmers/ProfileShimmer";
import HelmetComponent from "../components/HelmetComponent";

const useStyles = makeStyles({
  cardheader: {
    marginBottom: 25,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardParagraph: {
    marginTop: 7,
    marginBottom: 7,
  },
  editBtn: {
    ...styles.buttonStyle,
    background: colors.main,
  },

  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  itemLink: {
    textDecoration: "none",
    color: colors.main,
    fontSize: 14,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  orderImage: {
    width: 75,
    height: 75,
    margin: 10,
  },
  orderOverflow: {
    overflowX: "auto",
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
});

const ProfileScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const ordersFetch = useSelector((state) => state.ordersFetch);
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { success } = useSelector((state) => state.userUpdateProfile);
  const [userEdit, setUserEdit] = useState(false);
  const [shippingEdit, setShippingEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(fetchOrders(2));
      if (!user) {
        dispatch(getUserDetails(userInfo._id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setDefaultAddress(user.defaultAddress);
        setPhone(user.phone);
      }
    }

    if (success) {
      setUserEdit(false);
      setShippingEdit(false);
    }
    if (
      document
        .querySelector(".searchResultContainer")
        .classList.contains("show")
    )
      document.querySelector(".searchResultContainer").classList.remove("show");
  }, [dispatch, userInfo, user, history, success]);

  return ordersFetch.loading || loading ? (
    <ProfileShimmer />
  ) : error || ordersFetch.error ? (
    <CustomAlert message={error || ordersFetch.error} type="error" />
  ) : (
    <>
      <HelmetComponent title={"Profile: " + userInfo.name} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Profile</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomCard>
            <div className={classes.cardheader}>
              <Typography variant="h6">Personal Info</Typography>
              <Button
                className={classes.editBtn}
                size="small"
                onClick={() => setUserEdit(!userEdit)}
              >
                {userEdit ? "Close" : "Edit"}
              </Button>
            </div>
            {user ? (
              userEdit ? (
                <UserEdit />
              ) : (
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText>{name}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Mail />
                    </ListItemIcon>
                    <ListItemText>{email}</ListItemText>
                  </ListItem>
                </List>
              )
            ) : null}
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomCard>
            <div className={classes.cardheader}>
              <Typography variant="h6">Shipping Info</Typography>
              <Button
                className={classes.editBtn}
                size="small"
                onClick={() => setShippingEdit(!shippingEdit)}
              >
                {shippingEdit ? "Close" : "Edit"}
              </Button>
            </div>
            {user ? (
              shippingEdit ? (
                <ShippingDetailsEdit />
              ) : (
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText>{phone ? phone : "No phone"}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText>
                      {" "}
                      {defaultAddress ? defaultAddress : "No shipping address"}
                    </ListItemText>
                  </ListItem>
                </List>
              )
            ) : null}
          </CustomCard>
        </Grid>
        {ordersFetch.orders && ordersFetch.orders.length === 0 ? (
          <>
            <br />
            <br />
            <br />
            <br />
            <Typography align="center">You got no recent Orders</Typography>
          </>
        ) : (
          <Grid xs={12}>
            <div className={classes.orderHeader}>
              <Typography variant="h6">Recent Orders</Typography>
              <Button
                size="small"
                className={classes.view}
                onClick={() => history.push(`/orders`)}
              >
                All Orders
              </Button>
            </div>
            <br />
            <Grid container spacing={2} wrap>
              {ordersFetch.orders &&
                ordersFetch.orders.map((orderItem) => (
                  <Grid xs={12}>
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
                            history.push(
                              `/order/${orderItem._id}?redirect=profile`
                            )
                          }
                        >
                          more
                        </Button>
                      </div>
                      <Grid container spacing={2}>
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
                                to={`/product/${item.product}?redirect=profile`}
                              >
                                <img
                                  src={item.image}
                                  width="100%"
                                  alt={item.name}
                                />
                              </Link>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Link
                                className={classes.itemLink}
                                to={`/product/${item.product}?redirect=profile`}
                              >
                                {item.name}
                              </Link>
                            </Grid>
                            <Grid item xs={4} sm={2}>
                              <Typography className={classes.qty}>
                                Qty: {" " + item.qty}
                              </Typography>
                            </Grid>

                            <Grid item xs={4} sm={2}>
                              <Chip
                                size="small"
                                label={orderItem.isPaid ? "Paid" : "Not paid"}
                                color={
                                  orderItem.isPaid ? "primary" : "secondary"
                                }
                              />
                            </Grid>
                            <Grid item xs={4} sm={3}>
                              <Chip
                                size="small"
                                label={
                                  orderItem.isDelivered
                                    ? "Delivered"
                                    : "Not Delivered"
                                }
                                variant="outlined"
                                color={
                                  orderItem.isPaid ? "primary" : "secondary"
                                }
                              />
                            </Grid>
                            <Hidden smUp>
                              <Grid item xs={12}>
                                <br />
                              </Grid>
                            </Hidden>
                          </Grid>
                        ))}
                      </Grid>
                    </CustomCard>
                    <br />
                    <br />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ProfileScreen;
