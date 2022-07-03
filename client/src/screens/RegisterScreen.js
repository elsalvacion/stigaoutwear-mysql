import {
  Button,
  // Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import colors from "../utils/Colors";
import Styles from "../utils/Styles";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/CustomLoader";
import CustomAlert from "../components/CustomAlert";
import { registerUser } from "../actions/userAction";
import { useHistory, useLocation } from "react-router-dom";
import HelmetComponent from "../components/HelmetComponent";

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

// help from
// https://v5.reactrouter.com/web/example/query-parameters
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const RegisterScreen = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );
  const history = useHistory();
  let query = useQuery();

  const redirect = query.get("redirect") ? `/${query.get("redirect")}` : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.name === "" || values.email === "" || values.password === "")
      setMessage("All fields are required");
    else if (values.confirmPassword !== values.password) {
      setMessage("Passwords do not match");
    } else {
      dispatch(registerUser(values.email, values.password, values.name));
    }
  };

  return (
    <FormContainer>
      <HelmetComponent title="Register: Stiga outwear" />
      {loading && (
        <>
          <Loader />
        </>
      )}
      <Grid container spacing={2}>
        <Grid item sm={3}></Grid>
        <Grid item sm={6}>
          <Typography align="center" variant="h6">
            Register
          </Typography>
          {error && <CustomAlert type="error" message={error} />}
          {message && <CustomAlert type="error" message={message} />}
          <div>
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
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  label="Password"
                  required={true}
                  handleChange={handleChange}
                  value={values.password}
                />
              </Grid>

              <Grid item xs={12}>
                <FormInput
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  required={true}
                  handleChange={handleChange}
                  value={values.confirmPassword}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  className={classes.submitBtn}
                  color="primary"
                  variant="contained"
                  title="Regster"
                  size="large"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={3}></Grid>
        {/* 
        <Grid item sm={1}>
          <Divider orientation="vertical" flexItem />
        </Grid>
        <Grid item sm={5}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button
                className={classes.submitBtn}
                color="primary"
                variant="contained"
                title="Regster"
                size="large"
                fullWidth
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography>Or Register with</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.facebook}
                color="primary"
                variant="contained"
                title="Facebook"
                size="large"
                fullWidth
                startIcon={<i class="fab fa-facebook fa-2x"></i>}
              >
                Facebook
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                className={classes.google}
                color="primary"
                variant="contained"
                type="submit"
                title="Google"
                size="large"
                fullWidth
                startIcon={<i class="fab fa-google fa-2x"></i>}
              >
                Google
              </Button>
            </Grid> 
          </Grid>
        </Grid> */}
      </Grid>
    </FormContainer>
  );
};

export default RegisterScreen;
