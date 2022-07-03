import colors from "./Colors";

const styles = {
  buttonStyle: {
    color: colors.primary,

    "&:hover": {
      backgroundColor: colors.main,
    },
    /*
    Ripple effect help from 
    https://stackoverflow.com/questions/56169750/change-ripple-color-on-click-of-material-ui-button 
    */
    "& .MuiTouchRipple-root span": {
      backgroundColor: `${colors.main} !important`,
      opacity: 0.3,
    },
  },
};

export default styles;
