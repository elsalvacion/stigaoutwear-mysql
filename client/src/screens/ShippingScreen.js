import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  ListItemIcon,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CustomCard from "../components/CustomCard";
import ShoppingStepper from "../components/ShoppingStepper";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Styles from "../utils/Styles";
import colors from "../utils/Colors";
import CustomLoader from "../components/CustomLoader";
import CustomAlert from "../components/CustomAlert";
import ShippingScreenEdit from "../components/ShippingScreenEdit";
import { saveShippingInfo } from "../actions/cartAction";
import { Person, Mail, Phone, Home } from "@material-ui/icons";
import HelmetComponent from "../components/HelmetComponent";
import { CREATE_ORDER_RESET } from "../reducers/types/orderTypes";

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
    ...Styles.buttonStyle,
    background: colors.main,
  },
});
const ShippingScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { shippingInfo, loading, error } = useSelector(
    (state) => state.shippingInfo
  );
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");

  useEffect(() => {
    if (!userInfo) {
      history.push("/cart?redirect=shipping");
    } else {
      if (!shippingInfo) {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setDefaultAddress(userInfo.defaultAddress);
        setPhone(userInfo.phone);
      } else {
        setName(shippingInfo.name);
        setEmail(shippingInfo.email);
        setDefaultAddress(shippingInfo.defaultAddress);
        setPhone(shippingInfo.phone);
      }
    }
  }, [dispatch, edit, userInfo, history, shippingInfo]);
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

  const goToPayment = () => {
    if (name === "" || email === "" || defaultAddress === "" || phone === "") {
      alert("All fields are required");
    } else {
      dispatch(
        saveShippingInfo({
          name,
          email,
          phone,
          defaultAddress,
        })
      );
      dispatch({ type: CREATE_ORDER_RESET });
      history.push("/payment");
    }
  };
  return (
    <>
      <HelmetComponent title="Shipping Info: Stiga outwear" />
      {loading ? (
        <CustomLoader />
      ) : error ? (
        <CustomAlert message={error} type="error" />
      ) : (
        <Container>
          <ShoppingStepper lables={labels} currentStep={2} />
          <br />
          <Grid
            container
            spacing={5}
            justifyContent="center"
            alignItems="center"
          >
            <Grid xs={12} sm={8} md={6}>
              <CustomCard>
                <div className={classes.cardheader}>
                  <Typography variant="h6">Shipping Details</Typography>
                  <Button
                    className={classes.editBtn}
                    size="small"
                    onClick={() => setEdit(!edit)}
                  >
                    {edit ? "Close" : "Edit"}
                  </Button>
                </div>
                {edit ? (
                  <ShippingScreenEdit />
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
                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText>{phone}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Home />
                      </ListItemIcon>
                      <ListItemText>{defaultAddress}</ListItemText>
                    </ListItem>
                  </List>
                )}
                <br />
                <Button
                  className={classes.editBtn}
                  color="primary"
                  variant="contained"
                  title="Update"
                  size="small"
                  onClick={goToPayment}
                >
                  Next
                </Button>
              </CustomCard>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ShippingScreen;
