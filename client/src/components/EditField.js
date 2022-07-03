import { makeStyles } from "@material-ui/styles";
import React from "react";
import colors from "../utils/Colors";
import styles from "../utils/Styles";
import FormInput from "./FormInput";
const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  updateBtn: {
    ...styles.buttonStyle,
    background: colors.main,
  },
});
const EditField = () => {
  return (
    <div>
      <FormInput className={Input} />
      <Button className={classes.updateBtn} size="small">
        Update
      </Button>
    </div>
  );
};

export default EditField;
