import React from "react";
import { makeStyles } from "@material-ui/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    "& > * + *": {
      marginTop: 15,
    },
  },
});
const CustomAlert = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert variant="filled" severity={props.type}>
        {props.message}
      </Alert>
    </div>
  );
};

export default CustomAlert;
