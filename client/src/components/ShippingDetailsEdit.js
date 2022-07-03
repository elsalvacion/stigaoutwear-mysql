import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import colors from "../utils/Colors";
import Styles from "../utils/Styles";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/CustomLoader";
import CustomAlert from "../components/CustomAlert";
import { updateUserProfile } from "../actions/userAction";

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

const ShippingDetailsEdit = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    phone: "",
    defaultAddress: "",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    setValues({
      ...values,
      phone: userInfo.phone,
      defaultAddress: userInfo.defaultAddress,
    });
    // eslint-disable-next-line
  }, [userInfo]);
  const handleChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (values.phone === "" || values.defaultAddress === "") {
      setLoading(false);
      setMessage("All fields are required");
    } else {
      dispatch(updateUserProfile(values));
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <>
          <Loader />
        </>
      )}
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

export default ShippingDetailsEdit;
