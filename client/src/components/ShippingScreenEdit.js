import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import colors from "../utils/Colors";
import Styles from "../utils/Styles";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert from "../components/CustomAlert";
import { saveShippingInfo } from "../actions/cartAction";

const useStyles = makeStyles({
  submitBtn: {
    background: colors.main,
    ...Styles.buttonStyle,
  },
  facebook: {
    background: "#2979ff",
    color: "#f5f5f5",
    "&:hover": {
      background: "#01579b",
    },
  },
  google: {
    background: "#b71c1c",
    color: "#f5f5f5",

    "&:hover": {
      background: "#c62828",
    },
  },
});

const ShippingScreenEdit = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    phone: "",
    defaultAddress: "",
    name: "",
    email: "",
  });

  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { shippingInfo } = useSelector((state) => state.shippingInfo);

  useEffect(() => {
    if (!shippingInfo) {
      setValues({
        ...values,
        phone: userInfo.phone,
        defaultAddress: userInfo.defaultAddress,
        name: userInfo.name,
        email: userInfo.email,
      });
    } else {
      setValues({
        ...values,
        phone: shippingInfo.phone,
        defaultAddress: shippingInfo.defaultAddress,
        name: shippingInfo.name,
        email: shippingInfo.email,
      });
    }
    // eslint-disable-next-line
  }, [userInfo, shippingInfo]);
  const handleChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.phone === "" || values.defaultAddress === "")
      setMessage("All fields are required");
    else {
      dispatch(saveShippingInfo(values));
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          {message && <CustomAlert type="error" message={message} />}
          <form
            onSubmit={handleSubmit}
            autoSave="off"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormInput
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  label="Name"
                  required={true}
                  handleChange={handleChange}
                  value={values.name}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  label="Email"
                  required={true}
                  handleChange={handleChange}
                  value={values.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  name="phone"
                  type="text"
                  placeholder="Enter phone number"
                  label="Phone"
                  required={true}
                  handleChange={handleChange}
                  value={values.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  name="defaultAddress"
                  type="text"
                  placeholder="Enter shipping address"
                  label="Address"
                  required={true}
                  handleChange={handleChange}
                  value={values.defaultAddress}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.submitBtn}
                  color="primary"
                  variant="contained"
                  title="Update"
                  size="small"
                  type="submit"
                  fullWidth
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default ShippingScreenEdit;
