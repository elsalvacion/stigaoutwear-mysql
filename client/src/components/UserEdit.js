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

const UserEdit = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error } = useSelector((state) => state.userUpdateProfile);

  useEffect(() => {
    setValues({
      ...values,
      name: userInfo.name,
      email: userInfo.email,
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
    if (values.name === "" || values.email === "")
      setMessage("All fields are required");
    else {
      dispatch(updateUserProfile(values));
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
          {error && <CustomAlert type="error" message={error} />}
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

export default UserEdit;
