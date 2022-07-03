// import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import colors from "../utils/Colors";
const useStyles = makeStyles({
  LoaderContainer: {
    width: "100%",
    height: "100%",
    maxHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
const CustomLoader = () => {
  const classes = useStyles();
  return (
    <div className={classes.LoaderContainer}>
      <Loader
        type="Bars"
        color={colors.main}
        height={50}
        width={200}
        // timeout={3000} //3 secs
      />
    </div>
  );
};

export default CustomLoader;
