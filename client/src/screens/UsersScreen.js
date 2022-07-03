import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import HelmetComponent from "../components/HelmetComponent";
import { Done, Clear, Delete, Edit } from "@material-ui/icons";
import CustomAlert from "../components/CustomAlert";
import { getUsers, userDelete } from "../actions/userAction";
import SnackNotice from "../components/SnackNotice";
import { USER_DETAIL_RESET } from "../reducers/types/userTypes";
import AdminShimmer from "../shimmers/AdminShimmer";
const useStyles = makeStyles({
  tableWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});
const UsersScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    success,
    loading: deleteLoading,
    error: deleteError,
  } = useSelector((state) => state.userDelete);
  const { loading, users, error } = useSelector((state) => state.usersList);
  const history = useHistory();
  let [showSnack, setShowSnack] = useState(false);

  useEffect(() => {
    dispatch({
      type: USER_DETAIL_RESET,
    });
    if (!userInfo || !userInfo.isAdmin) {
      history.push(`/login?redirect=admin/users`);
    }
    dispatch(getUsers());
    if (success) {
      setShowSnack(true);
    }
  }, [userInfo, dispatch, history, success]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(userDelete(id));
    }
  };

  const handleSnackClose = () => {
    setShowSnack(false);
  };

  return (
    <>
      <HelmetComponent title="Users(Admin): Stiga outwear" />
      {loading || deleteLoading ? (
        <AdminShimmer />
      ) : error || deleteError ? (
        <CustomAlert message={error || deleteError} type="error" />
      ) : (
        <div className={classes.tableWrapper}>
          <TableContainer component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Admin</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    {user.isAdmin ? (
                      <IconButton color="#4caf50" disabled>
                        <Done />
                      </IconButton>
                    ) : (
                      <IconButton color="primary" disabled>
                        <Clear />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push(`/admin/user/edit/${user._id}`)
                      }
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(user._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </div>
      )}
      {showSnack && (
        <SnackNotice
          message={`Item added to cart`}
          handleSnackClose={handleSnackClose}
          align={{ vertical: "bottom", horizontal: "right" }}
        />
      )}
    </>
  );
};

export default UsersScreen;
