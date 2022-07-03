import { Card, CardContent, colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Colors from "../utils/Colors";
import { ShimmerThumbnail, ShimmerText } from "react-shimmer-effects";
import Rating from "../components/Rating";

const useStyles = makeStyles({
  card: {
    height: "100%",
    padding: 0,
    "&:hover": {
      boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
    },
  },
  productImage: {
    height: 75,
  },
  productTitle: {
    margin: "10px 0",
    textDecoration: "none",
    color: colors.grey[900],

    "&:hover": {
      textDecoration: "underline",
    },
  },
  productLink: {
    marginTop: 15,
    textDecoration: "none",
    color: colors.grey[900],
    padding: 5,

    "&:hover": {
      textDecoration: "underline",
    },
  },
  productPrice: {
    margin: "10px 0",
    color: Colors.main,
  },
});

const ProductShimmer = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} elevation={0}>
      <CardContent
        style={{
          padding: 5,
        }}
      >
        <ShimmerThumbnail height={100} />
        <ShimmerText line={1} />
        {props.rating && <Rating rating={4.5} />}
        <ShimmerText line={1} />
      </CardContent>
    </Card>
  );
};

export default ProductShimmer;
