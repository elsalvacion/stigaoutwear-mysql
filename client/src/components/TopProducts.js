import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert from "./CustomAlert";
import { listTopProducts } from "../actions/productAction";
import { makeStyles, Typography } from "@material-ui/core";
import colors from "../utils/Colors";
import TopProductShimmer from "../shimmers/TopProductShimmer";
const useStyles = makeStyles({
  slideOverlay: {
    background: "rgba(0,0,0,0.3)",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
  },
  slideDescription: {
    background: colors.main,
    color: colors.primary,
    padding: 20,
    width: "fit-content",
  },
  productLink: {
    marginTop: 7,
    textDecoration: "none",
    color: colors.primary,
    padding: 2,
    fontSize: 16,
  },
  productPrice: {
    margin: 10,
    color: "#eeeeee",
    textDecoration: "line-through",
  },
  discountPrice: {
    margin: 10,
    color: colors.primary,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: 14,
  },
  itemLink: {
    color: colors.primary,
    textDecoration: "none",
  },
});

const TopProducts = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { loading, error, products } = useSelector(
    (state) => state.productTopRated
  );

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <>
      <TopProductShimmer />
    </>
  ) : error ? (
    <CustomAlert message={error} type="error" />
  ) : (
    <Carousel
      stopAutoPlayOnHover={true}
      autoPlay={true}
      swipe={true}
      fullHeightHover={true}
    >
      {products.map((product) => (
        <Link
          key={product._id}
          className={classes.itemLink}
          to={`/product/${product._id}`}
        >
          <div
            style={{
              background: `url(${product.image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              height: "65vh",
            }}
          >
            <div className={classes.slideOverlay}>
              <div className={classes.slideDescription}>
                <Typography noWrap={true} className={classes.productLink}>
                  {product.name}
                </Typography>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default TopProducts;
