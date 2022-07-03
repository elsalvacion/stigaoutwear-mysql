import {
  Card,
  CardContent,
  CardMedia,
  colors,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import Colors from "../utils/Colors";

const useStyles = makeStyles({
  mainLink: {
    textDecoration: "none",
    color: "black",
  },
  card: {
    height: "100%",
    padding: 0,
    "&:hover": {
      boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
    },
  },
  productImage: {
    height: 0,
    paddingTop: "75.00%", // 16:9
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
    marginTop: 7,
    textDecoration: "none",
    color: colors.grey[900],
    padding: 2,
    fontSize: 14,
  },
  productPrice: {
    margin: 10,
    color: "#212121",
    textDecoration: "line-through",
  },
  discountPrice: {
    margin: 10,
    color: Colors.main,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: 13,
  },
});

const Product = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} elevation={0}>
      <CardContent
        style={{
          padding: 5,
        }}
      >
        <Link className={classes.mainLink} to={`/product/${product._id}`}>
          <CardMedia className={classes.productImage} image={product.image} />
          <Typography noWrap={true} className={classes.productLink}>
            {product.name}
          </Typography>

          <div className={classes.priceContainer}>
            {product.discount ? (
              <>
                <p className={classes.productPrice}>
                  GMD{" " + product.price.toFixed(2)}
                </p>
                <p className={classes.discountPrice}>
                  GMD
                  {" " +
                    Number(
                      (100 - product.discount) * 0.01 * product.price
                    ).toFixed(2)}
                </p>
              </>
            ) : (
              <p className={classes.discountPrice}>
                GMD{" " + product.price.toFixed(2)}
              </p>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Product;
