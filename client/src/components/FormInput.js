import { makeStyles } from "@material-ui/styles";
import React from "react";
import colors from "../utils/Colors";

const useStyles = makeStyles({
  inputContainer: {
    marginTop: 7,
    marginBottom: 7,
  },
  label: {
    display: "block",
    marginTop: "5px 0",
    fontSize: 16,
  },
  input: {
    display: "block",
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    outline: 0,
    border: `1px solid ${colors.main}`,
    width: "100%",
    borderRadius: 7,

    "&:focus": {
      boxShadow: `2px 2px 5px rgba(0,0,0,0.1)`,
    },
  },
});

const FormInput = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.inputContainer}>
      <label className={classes.label}>{props.label}</label>
      <input
        className={classes.input}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        value={props.value}
        onChange={props.handleChange}
        disabled={props.disabled ? props.disabled : false}
      />
    </div>
  );
};

export default FormInput;
