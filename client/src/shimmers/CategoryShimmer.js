import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { ShimmerTitle } from "react-shimmer-effects";
import ProductShimmer from "./ProductShimmer";

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
    margin: 7,
    width: 170,
    "@media(max-width: 500px)": {
      width: 150,
    },
  },
});
const CategoryShimmer = () => {
  const classes = useStyles();
  const products = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <>
      <Container>
        <ShimmerTitle line={1} />
      </Container>
      <div className={classes.container}>
        <div className={classes.grid}>
          {products.map(() => (
            <div className={classes.gridItem}>
              <ProductShimmer rating={true} />
            </div>
          ))}
        </div>
        <br />
      </div>
    </>
  );
};

export default CategoryShimmer;
