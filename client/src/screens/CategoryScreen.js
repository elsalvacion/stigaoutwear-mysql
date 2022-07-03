import { Typography, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import CategoryProduct from "../components/CategoryProduct";
import HelmetComponent from "../components/HelmetComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList, getCategory } from "../actions/productAction";
import CustomAlert from "../components/CustomAlert";
import { SkipPrevious, SkipNext } from "@material-ui/icons";
import colors from "../utils/Colors";
import styles from "../utils/Styles";
import { useParams } from "react-router-dom";
import CategoryShimmer from "../shimmers/CategoryShimmer";
const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  grid: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    padding: 7,
  },
  gridItem: {
    margin: 5,
    width: 165,
    "@media(max-width: 500px)": {
      width: 150,
    },
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
const HomeScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { category } = useParams();
  useEffect(() => {
    dispatch(getCategory("", 1, 50, category));
  }, [dispatch, category]);
  const { products, loading, error, pagination, keyword } = useSelector(
    (state) => state.category
  );
  return (
    <div className={classes.container}>
      <HelmetComponent title={category + ": Stiga outwear"} />
      {loading ? (
        <CategoryShimmer />
      ) : error ? (
        <CustomAlert message={error} type="error" />
      ) : (
        <>
          <Container>
            <Typography className={classes.title} variant="h5">
              {category}
            </Typography>
          </Container>
          <br />
          <div className={classes.grid}>
            {products.map((product) => (
              <div className={classes.gridItem} key={product._id}>
                <CategoryProduct product={product} />
              </div>
            ))}
          </div>
          <br />
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
            <br />
            <br />
          </Container>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
