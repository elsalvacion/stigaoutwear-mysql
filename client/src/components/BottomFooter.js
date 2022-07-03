import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

import colors from "../utils/Colors";
const useStyles = makeStyles({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 500,
    boxShadow: "-2px 0 15 rgba(0,0,0,0.5)",
    padding: "40px 10px",
    display: "flex",
    flexWrap: "wrap",
    background: colors.primary,
    "media(max-width:500px)": {
      padding: "50px 10px",
      bottom: 30,
    },
  },
  item: {
    flex: 1,
    textAlign: "center",
  },
  icons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    margin: 10,
    color: colors.main,
    textDecoration: "none",
    fontSize: 18,
  },
});
const BottomFooter = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.item}>
        <Typography variant="h6">Connect With Us</Typography>
        <div className={classes.icons}>
          <a
            className={classes.icon}
            href="https://twitter.com/stiga_outwear"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fab fa-twitter"></i>
          </a>
          <a
            className={classes.icon}
            href="https://www.instagram.com/stiga_outwear/"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            className={classes.icon}
            href="https://www.facebook.com/stigaoutwear/"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fab fa-facebook"></i>
          </a>
          <a
            className={classes.icon}
            href="https://wa.me/2203193829"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
