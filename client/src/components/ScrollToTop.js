import React from "react";
import Zoom from "@material-ui/core/Zoom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Fab } from "@material-ui/core";
import { KeyboardArrowUp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../utils/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 3000,
  },
  toTop: {
    background: colors.main,
    color: colors.primary,
    "&:hover": {
      background: colors.main,
      color: colors.primary,
    },
  },
}));

function ScrollToTop(props) {
  const { window } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        <Fab
          className={classes.toTop}
          size="small"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUp />
        </Fab>
      </div>
    </Zoom>
  );
}

export default ScrollToTop;
