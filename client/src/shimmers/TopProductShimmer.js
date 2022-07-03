import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";

const useStyles = makeStyles({
  container: {
    marginBottom: 15,
  },
});
const TopProductShimmer = () => {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <CardContent>
        <ShimmerThumbnail height={350} />
      </CardContent>
    </Card>
  );
};

export default TopProductShimmer;
