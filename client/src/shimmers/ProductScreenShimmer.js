import { Divider, Grid } from "@material-ui/core";
import React from "react";
import {
  ShimmerBadge,
  ShimmerButton,
  ShimmerText,
  ShimmerThumbnail,
  ShimmerTitle,
} from "react-shimmer-effects";
import CustomCard from "../components/CustomCard";
import Rating from "../components/Rating";

const ProductScreenShimmer = () => {
  return (
    <CustomCard>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={6} lg={5}>
          <ShimmerThumbnail height={300} />
        </Grid>
        <Grid item xs={12} sm={6} lg={5}>
          <ShimmerTitle line={1} />
          <Rating label={"Review"} rating={4.5} />
          <ShimmerText line={1} />
          <ShimmerText line={1} />
          <ShimmerText line={1} />
          <br />
          <Divider />
          <br />
          <ShimmerText line={1} />
        </Grid>
        <Grid item xs={12} sm={12} lg={2}>
          <ShimmerBadge size="lg" width="100%" />
          <br />
          <Divider />
          <br />
          <ShimmerButton size="sm" />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Rating rating={4.5} />
              <ShimmerText line={1} />
            </Grid>
            <Grid xs={4}>
              <ShimmerTitle line={1} />
            </Grid>
            <Grid xs={12}>
              <Divider />
              <br />
            </Grid>
            <Grid xs={12}>
              <ShimmerText line={5} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CustomCard>
  );
};

export default ProductScreenShimmer;
