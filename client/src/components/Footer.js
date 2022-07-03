import {
  Container,
  Hidden,
  makeStyles,
  Typography,
  Button,
  Badge,
  IconButton,
} from "@material-ui/core";
import colors from "../utils/Colors";
import React, { useEffect, useState } from "react";
import { ShoppingCart, Person, Menu } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles({
  absoluteFooter: {
    background: colors.primary,
    color: colors.main,
    padding: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
    zIndex: 2000,
    boxShadow: "-2px 0 15 rgba(0,0,0,0.5)",
  },
  fixedFooter: {
    background: colors.primary,
    color: colors.main,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 2000,
    boxShadow: "-2px 0 15 rgba(0,0,0,0.5)",
  },
  link: {
    padding: 10,
    color: colors.main,

    "&:hover": {
      backgroundColor: colors.main,
      color: colors.primary,
    },
    /*
    Ripple effect help from 
    https://stackoverflow.com/questions/56169750/change-ripple-color-on-click-of-material-ui-button 
    */
    "& .MuiTouchRipple-root span": {
      backgroundColor: `${colors.primary} !important`,
      opacity: 0.3,
    },
    flex: 1,
    borderRadius: 0,
    borderRight: `1px solid ${colors.main}`,
  },
});

const Footer = () => {
  const classes = useStyles();
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.getCart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [cartSize, setCartSize] = useState(userInfo ? cartItems.length : 0);
  useEffect(() => {
    setCartSize(cartItems.length);
  }, [cartItems]);
  const [openSideNav, setOpenSideNav] = useState(false);

  const onCloseHandler = () => setOpenSideNav(false);

  return (
    <>
      <Hidden xlUp>
        <SideDrawer onCloseHandler={onCloseHandler} openSideNav={openSideNav} />
      </Hidden>
      <Hidden lgDown>
        <div className={classes.footer}>
          <Container>
            <Typography align="center">
              All rights reserved COMZ &copy;{new Date().getFullYear()}
            </Typography>
          </Container>
        </div>
      </Hidden>
      <Hidden smUp>
        <div className={classes.fixedFooter}>
          <IconButton
            className={classes.link}
            onClick={() => {
              setOpenSideNav(!openSideNav);
            }}
            size="small"
          >
            <Menu fontSize="small" />
          </IconButton>
          <IconButton
            className={classes.link}
            onClick={() => history.push("/cart")}
            size="small"
          >
            <Badge badgeContent={cartSize}>
              <ShoppingCart fontSize="small" />
            </Badge>
          </IconButton>

          {userInfo ? (
            <Button
              className={classes.link}
              onClick={() => history.push("/profile")}
              startIcon={<Person />}
              style={{
                borderRight: 0,
              }}
            >
              {userInfo.name.charAt(0) + userInfo.name.charAt(1)}
            </Button>
          ) : (
            <Button
              className={classes.link}
              style={{
                borderRight: 0,
              }}
              onClick={() => history.push("/login")}
              startIcon={<Person fontSize="small" />}
              size="small"
            >
              Sign In
            </Button>
          )}
        </div>
      </Hidden>
    </>
  );
};

export default Footer;
