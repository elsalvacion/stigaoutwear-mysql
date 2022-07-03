import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
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
const HomeProductShimmer = () => {
  const classes = useStyles();
  const products = [1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <div className={classes.container}>
      <Container>
        <Typography className={classes.title} variant="h5">
          Latest Products
        </Typography>
      </Container>
      <div className={classes.grid}>
        {products.map(() => (
          <div key={Math.random() * 1000 + 2} className={classes.gridItem}>
            <ProductShimmer />
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default HomeProductShimmer;
