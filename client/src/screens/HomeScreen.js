import { Typography, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList } from "../actions/productAction";
import CustomAlert from "../components/CustomAlert";
import { SkipPrevious, SkipNext } from "@material-ui/icons";
import colors from "../utils/Colors";
import styles from "../utils/Styles";
import CategoryCarousel from "../components/CategoryCarousel";
import HomeProductShimmer from "../shimmers/HomeProductsShimmer";
import { getCategories } from "../actions/categoryAction";
import HelmetComponent from "../components/HelmetComponent";

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
  const { categories } = useSelector((state) => state.categoryList);
  useEffect(() => {
    dispatch(fetchProductsList());
    dispatch(getCategories());
    if (
      document
        .querySelector(".searchResultContainer")
        .classList.contains("show")
    )
      document.querySelector(".searchResultContainer").classList.remove("show");
  }, [dispatch]);
  const { products, loading, error, pagination, keyword } = useSelector(
    (state) => state.productList
  );
  return (
    <div className={classes.container}>
      <HelmetComponent title="Home: Stiga Outwear" />
      {loading ? (
        <HomeProductShimmer />
      ) : error ? (
        <CustomAlert message={error} type="error" />
      ) : (
        <>
          <Container>
            <Typography className={classes.title} variant="h5">
              Latest Products
            </Typography>
          </Container>
          <br />
          <div className={classes.grid}>
            {products.map((product) => (
              <div className={classes.gridItem} key={product._id}>
                <Product product={product} />
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
      <Container>
        {categories.map((category) => (
          <CategoryCarousel key={category._id} category={category.title} />
        ))}
      </Container>
    </div>
  );
};

export default HomeScreen;
