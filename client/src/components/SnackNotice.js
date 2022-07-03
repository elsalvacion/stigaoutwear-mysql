import { Snackbar } from "@material-ui/core";
import React from "react";
import { Alert } from "@material-ui/lab";
const SnackNotice = ({ message, type, handleSnackClose, align }) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={align ? align : { vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      style={{
        zIndex: 3000,
      }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={type ? type : "success"}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackNotice;
