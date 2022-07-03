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
import { loginUser } from "../actions/userAction";
import { useHistory, useLocation, Link } from "react-router-dom";
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

const LoginScreen = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  let query = useQuery();

  const redirect = query.get("redirect") ? `/${query.get("redirect")}` : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const [message, setMessage] = useState(null);

  const handleChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email === "" || values.password === "") {
      setMessage("All fields are required");
    } else dispatch(loginUser(values.email, values.password));
  };

  return (
    <FormContainer>
      <HelmetComponent title="Login: Stiga outwear" />
      {loading && (
        <>
          <Loader />
        </>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={3}></Grid>

          <Grid item sm={6}>
            <Typography align="center" variant="h6">
              Login
            </Typography>
            <br />
            {error && <CustomAlert type="error" message={error} />}
            {message && <CustomAlert type="error" message={message} />}

            <div>
              <Grid container spacing={2}>
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
                  <span>New Customer?</span>{" "}
                  <span>
                    <Link
                      to={`/register?redirect=${
                        query.get("redirect") ? `${query.get("redirect")}` : ""
                      }`}
                    >
                      Create new Account.
                    </Link>
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={classes.submitBtn}
                    color="primary"
                    variant="contained"
                    title="Log In"
                    size="large"
                    type="submit"
                    fullWidth
                  >
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item sm={3}></Grid>

          {/* <Grid item sm={1}>
            <Divider orientation="vertical" flexItem />
          </Grid> */}
          {/* <Grid item sm={5}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <span>New Customer?</span>{" "}
                <span>
                  <Link to={`/register?redirect=${redirect}`}>
                    Create new Account.
                  </Link>
                </span>
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.submitBtn}
                  color="primary"
                  variant="contained"
                  title="Log In"
                  size="large"
                  type="submit"
                  fullWidth
                >
                  Log In
                </Button>
              </Grid>
              <Grid item xs={12}>
              <Typography>Or Login with</Typography>
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
      </form>
    </FormContainer>
  );
};

export default LoginScreen;
