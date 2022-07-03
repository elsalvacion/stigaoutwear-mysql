import React from "react";
import { Star, StarHalf, StarBorder } from "@material-ui/icons";
import { colors, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  productRatingContainer: {
    color: colors.yellow[600],
  },
});

const Rating = ({ rating, label }) => {
  const classes = useStyles();

  return (
    <div className={classes.productRatingContainer}>
      {rating >= 1 ? (
        <Star fontSize="small" />
      ) : rating >= 0.5 ? (
        <StarHalf fontSize="small" />
      ) : (
        <StarBorder />
      )}
      {rating >= 2 ? (
        <Star fontSize="small" />
      ) : rating >= 1.5 ? (
        <StarHalf fontSize="small" />
      ) : (
        <StarBorder />
      )}
      {rating >= 3 ? (
        <Star fontSize="small" />
      ) : rating >= 2.5 ? (
        <StarHalf fontSize="small" />
      ) : (
        <StarBorder />
      )}
      {rating >= 4 ? (
        <Star fontSize="small" />
      ) : rating >= 3.5 ? (
        <StarHalf fontSize="small" />
      ) : (
        <StarBorder fontSize="small" />
      )}
      {rating >= 5 ? (
        <Star fontSize="small" />
      ) : rating >= 4.5 ? (
        <StarHalf fontSize="small" />
      ) : (
        <StarBorder fontSize="small" />
      )}

      <Typography color="textSecondary">{label}</Typography>
    </div>
  );
};

export default Rating;
