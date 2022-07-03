import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Delete, Visibility } from "@material-ui/icons";
import CustomAlert from "../components/CustomAlert";
import SnackNotice from "../components/SnackNotice";
import colors from "../utils/Colors";
import styles from "../utils/Styles";
import { ORDER_DELETE_RESET } from "../reducers/types/orderTypes";
import { getOrderList, deleteOrder } from "../actions/orderAction";
import AdminShimmer from "../shimmers/AdminShimmer";
import HelmetComponent from "../components/HelmetComponent";

const useStyles = makeStyles({
  tableWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  createProductHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
  },
  left: {
    color: "#757575",
    fontSize: 14,
    margin: "10px 0",
  },
  createBtn: {
    ...styles.buttonStyle,
    background: colors.main,
    margin: "10px 0",
  },
});
const OrderListScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const history = useHistory();
  let [createSnack, setCreateSnack] = useState(false);
  let [deleteSnack, setDeleteSnack] = useState(false);
  let [updateSnack, setUpdateSnack] = useState(false);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push(`/login?redirect=admin/orders`);
    } else {
      dispatch(getOrderList());
    }
    if (successDelete) {
      setDeleteSnack(true);
      dispatch({ type: ORDER_DELETE_RESET });
    }
  }, [userInfo, dispatch, successDelete, history]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteOrder(id));
    }
  };

  return (
    <>
      <HelmetComponent title="Admin Orders: Stiga outwear" />
      {loading || loadingDelete ? (
        <AdminShimmer />
      ) : error || errorDelete ? (
        <CustomAlert message={error || errorDelete} type="error" />
      ) : (
        <>
          <Typography variant="h5">Orders</Typography>
          <br />
          <div className={classes.tableWrapper}>
            <TableContainer component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell align="center"># Items</TableCell>
                  <TableCell align="center">Phone #</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell align="center">
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          handleDelete(order._id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        className={classes.createBtn}
                        onClick={() =>
                          history.push(
                            `/order/${order._id}?redirect=admin/orders`
                          )
                        }
                        endIcon={<Visibility />}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="center">{order._id}</TableCell>
                    <TableCell align="center">
                      GMD{" " + order.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      {order.selectedItems.length}
                    </TableCell>
                    <TableCell align="center">
                      {order.shippingInfo.phone}
                    </TableCell>
                    <TableCell align="center">{order.name}</TableCell>
                    <TableCell align="center">
                      {order.shippingInfo.address}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </div>
        </>
      )}
      {deleteSnack && (
        <SnackNotice
          message={`Product deleted`}
          handleSnackClose={() => setDeleteSnack(false)}
          align={{ vertical: "bottom", horizontal: "right" }}
        />
      )}

      {createSnack && (
        <SnackNotice
          message={`New Product added`}
          handleSnackClose={() => setCreateSnack(false)}
          align={{ vertical: "bottom", horizontal: "right" }}
        />
      )}

      {updateSnack && (
        <SnackNotice
          message={`Product editted`}
          handleSnackClose={() => setUpdateSnack(false)}
          align={{ vertical: "bottom", horizontal: "right" }}
        />
      )}
    </>
  );
};

export default OrderListScreen;
