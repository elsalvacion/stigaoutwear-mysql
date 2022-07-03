import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CustomCard from "../components/CustomCard";
import { updateUser, userDetail } from "../actions/userAction";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import colors from "../utils/Colors";
import Styles from "../utils/Styles";
import FormInput from "../components/FormInput";
import CustomLoader from "../components/CustomLoader";
import CustomAlert from "../components/CustomAlert";
import { UPDATE_USER_RESET } from "../reducers/types/userTypes";
import { ArrowBack } from "@material-ui/icons";
import HelmetComponent from "../components/HelmetComponent";

const useStyles = makeStyles({
  submitBtn: {
    background: colors.main,
    ...Styles.buttonStyle,
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
  btn: {
    background: colors.main,
    color: colors.primary,
    marginBottom: 15,

    ...Styles.buttonStyle,
  },
});

const UserEdit = () => {
  const { id: userId } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const ordersFetch = useSelector((state) => state.ordersFetch);
  const { loading, error, user } = useSelector((state) => state.userDetail);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdate);

  const [values, setValues] = useState({
    name: "",
    email: "",
    isAdmin: false,
    id: userId,
  });

  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_USER_RESET });
      history.push("/admin/users");
    } else {
      if (!userInfo || !userInfo.isAdmin || !userId) {
        history.push(`/login?redirect=admin/user/edit/${userId}`);
      } else {
        if (!user) {
          dispatch(userDetail(userId));
        } else {
          setValues({
            ...values,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          });
        }
      }
    }
    // eslint-disable-next-line
  }, [dispatch, userInfo, userId, user, history, successUpdate]);

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
      console.log(values);
      dispatch(updateUser(values));
    }
  };

  return (
    <Container>
      <HelmetComponent title="Edit User(Admin): Stiga outwear" />
      {loading || loadingUpdate ? (
        <CustomLoader />
      ) : error || errorUpdate ? (
        <CustomAlert message={error || ordersFetch.error} type="error" />
      ) : (
        <CustomCard>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                className={classes.btn}
                variant="contained"
                startIcon={<ArrowBack fontSize="small" />}
                onClick={() => {
                  dispatch({ type: UPDATE_USER_RESET });
                  history.push("/admin/users");
                }}
                size="small"
              >
                BACK
              </Button>
            </Grid>
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isAdmin"
                          onChange={() =>
                            setValues({ ...values, isAdmin: !values.isAdmin })
                          }
                          checkedIcon={<span className={classes.checkedIcon} />}
                          checked={values.isAdmin}
                        />
                      }
                      label="isAdmin"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      className={classes.submitBtn}
                      color="primary"
                      variant="contained"
                      title="Update"
                      size="small"
                      type="submit"
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </CustomCard>
      )}
    </Container>
  );
};

export default UserEdit;
