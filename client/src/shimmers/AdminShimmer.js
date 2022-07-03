import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ShimmerButton, ShimmerTable } from "react-shimmer-effects";
const useStyles = makeStyles({
  createProductHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: 20,
  },
  table: {
    background: "white",
  },
});
const AdminShimmer = () => {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <div className={classes.createProductHeader}>
        <ShimmerButton size="md" />

        <ShimmerButton size="md" />
      </div>

      <ShimmerTable row={10} col={7} />
    </div>
  );
};

export default AdminShimmer;
