import {
  Container,
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
import {
  Delete,
  Edit,
  Add,
  Visibility,
  SkipPrevious,
  SkipNext,
} from "@material-ui/icons";
import CustomAlert from "../components/CustomAlert";
import SnackNotice from "../components/SnackNotice";
import { deleteProduct, fetchProductsList } from "../actions/productAction";
import colors from "../utils/Colors";
import styles from "../utils/Styles";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
  PRODUCT_DETAILS_RESET,
  PRODUCT_EDIT_RESET,
} from "../reducers/types/productsTypes";
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
    margin: "10px 5px",
  },
  pagination: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
const ProductListScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pagination, keyword } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const { success: createSuccess } = useSelector(
    (state) => state.productCreate
  );
  const { success: updateSucsess } = useSelector(
    (state) => state.productUpdate
  );
  const { product: details } = useSelector((state) => state.productDetails);
  const history = useHistory();
  let [createSnack, setCreateSnack] = useState(false);
  let [deleteSnack, setDeleteSnack] = useState(false);
  let [updateSnack, setUpdateSnack] = useState(false);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push(`/login?redirect=admin/products`);
    }
    dispatch(fetchProductsList());
    if (successDelete) {
      setDeleteSnack(true);
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    if (createSuccess) {
      setCreateSnack(true);

      dispatch({ type: PRODUCT_CREATE_RESET });
    }

    if (updateSucsess) {
      setUpdateSnack(true);
      dispatch({ type: PRODUCT_EDIT_RESET });
    }
    if (details) {
      dispatch({ type: PRODUCT_DETAILS_RESET });
    }
  }, [
    userInfo,
    dispatch,
    successDelete,
    createSuccess,
    updateSucsess,
    history,
    details,
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <HelmetComponent title="Admin Product: Stiga outwear" />
      {loading || loadingDelete ? (
        <AdminShimmer />
      ) : error || errorDelete ? (
        <CustomAlert message={error || errorDelete} type="error" />
      ) : (
        <>
          <div className={classes.createProductHeader}>
            <Typography variant="h5" className={classes.left}>
              Products
            </Typography>
            <Button
              size="small"
              className={classes.createBtn}
              onClick={() => history.push(`/admin/product/create`)}
              endIcon={<Add />}
            >
              Create
            </Button>
          </div>
          <br />
          <div className={classes.tableWrapper}>
            <TableContainer component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Discount</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Brand</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell align="center">
                      <IconButton
                        onClick={() =>
                          history.push(`/admin/product/edit/${product._id}`)
                        }
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(product._id)}
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
                            `/product/${product._id}?redirect=admin/products`
                          )
                        }
                        endIcon={<Visibility />}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">
                      GMD{" " + product.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      {product.discount + " %"}
                    </TableCell>
                    <TableCell align="center">{product.category}</TableCell>
                    <TableCell align="center">{product.brand}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </div>

          <Container className={classes.pagination}>
            {pagination && pagination.prev && (
              <Button
                size="small"
                className={classes.createBtn}
                onClick={() => {
                  dispatch(fetchProductsList(keyword, pagination.prev.page));
                }}
                startIcon={<SkipPrevious />}
              >
                Prev
              </Button>
            )}
            {pagination && pagination.next && (
              <Button
                size="small"
                className={classes.createBtn}
                onClick={() => {
                  dispatch(fetchProductsList(keyword, pagination.next.page));
                }}
                endIcon={<SkipNext />}
              >
                Next
              </Button>
            )}
          </Container>
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

export default ProductListScreen;
