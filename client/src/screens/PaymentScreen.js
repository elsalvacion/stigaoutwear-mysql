import {
  Container,
  Grid,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CustomCard from "../components/CustomCard";
import ShoppingStepper from "../components/ShoppingStepper";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Styles from "../utils/Styles";
import colors from "../utils/Colors";
import { saveShippingInfo } from "../actions/cartAction";
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
    ...Styles.buttonStyle,
    background: colors.main,
  },
});
const PaymentScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [method, setMethod] = useState("COD");

  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.getCart);
  const { shippingInfo } = useSelector((state) => state.shippingInfo);

  useEffect(() => {
    if (!userInfo || !shippingInfo || cartItems.length === 0) {
      history.push("/cart?redirect=payment");
    }
  }, [userInfo, shippingInfo, cartItems, history]);
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

  const handleChange = (e) => {
    setMethod(e.target.value);
  };
  const goToOrder = () => {
    dispatch(
      saveShippingInfo({
        ...shippingInfo,
        paymentMethod: method,
      })
    );
    history.push("/placeorder");
  };
  return (
    <Container>
      <HelmetComponent title="Payment Method: Stiga outwear" />
      <ShoppingStepper lables={labels} currentStep={3} />
      <br />
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        <Grid xs={12} sm={8} md={6}>
          <CustomCard>
            <div className={classes.cardheader}>
              <Typography variant="h6">Payment Method</Typography>
            </div>
            {userInfo && (
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={method}
                  onChange={handleChange}
                >
                  {/* <FormControlLabel
                    value="PayPal"
                    control={<Radio />}
                    label="PayPal"
                  /> */}
                  <FormControlLabel
                    value="COD"
                    control={<Radio />}
                    label="Cash on delivery"
                  />
                  <FormControlLabel
                    value="Bank Transfer"
                    control={<Radio />}
                    label="Bank Transfer"
                  />
                </RadioGroup>
              </FormControl>
            )}
            <br />
            <br />

            <Button
              className={classes.editBtn}
              color="primary"
              variant="contained"
              title="Update"
              size="small"
              onClick={goToOrder}
            >
              Next
            </Button>
          </CustomCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentScreen;
