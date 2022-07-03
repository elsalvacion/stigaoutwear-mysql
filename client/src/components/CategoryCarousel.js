import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomAlert from "./CustomAlert";
import { makeStyles } from "@material-ui/styles";
import CategoryProduct from "./CategoryProduct";
import { Typography, Button } from "@material-ui/core";
import ProductCarouselShimmer from "../shimmers/ProductCarouselShimmer";
import styles from "../utils/Styles";
import colors from "../utils/Colors";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  gridItem: {
    margin: 7,
    flex: 1,
  },
  carouselHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 14,
  },
  view: {
    ...styles.buttonStyle,
    background: colors.main,
    margin: "10px 0",
  },
});
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const CategoryCarousel = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          `/products?page=${1}&keyword=${""}&category=${
            props.category
          }&limit=${20}`
        );
        if (data) {
          setLoading(false);
          setProducts(data.products);
        }
      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    };
    getProducts();
  }, [props.category]);

  return loading ? (
    <ProductCarouselShimmer />
  ) : error ? (
    <CustomAlert message={error} type="error" />
  ) : products.length === 0 ? null : products.length < 7 ? null : (
    <>
      <br />
      <br />
      <div className={classes.carouselHeader}>
        <Typography className={classes.title} variant="h5">
          {props.category}
        </Typography>
        <Button
          className={classes.view}
          size="small"
          onClick={() => {
            history.push(`/category/${props.category}`);
          }}
        >
          More
        </Button>
      </div>
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1500}
        keyBoardControl={true}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        pauseOnHover={true}
        centerMode={true}
      >
        {products.map((product) => (
          <CategoryProduct key={product._id} product={product} />
        ))}
      </Carousel>
      <br />
      <br />
    </>
  );
};

export default CategoryCarousel;
