import React, { useEffect, useState } from "react";
import { Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../utils/Colors";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../actions/productAction";
import SearchOuput from "./SearchOuput";
import { Hidden, Button, Badge, IconButton } from "@material-ui/core";
import { ShoppingCart, Person, Menu } from "@material-ui/icons";
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    zIndex: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50px",
    background: colors.primary,
    padding: "3px 7px",
  },
  headerTitle: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "& span": {
      color: colors.main,
      fontWeight: "bold",
      fontSize: 18,
      marginLeft: 10,
      "@media(max-width: 500px)": {
        fontSize: 12,
        marginLeft: 5,
      },
    },
    "& img": {
      width: 40,
      height: 40,
      "@media(max-width: 500px)": {
        width: 25,
        height: 25,
      },
    },
  },
  search: {
    flex: 1,
    display: "flex",
    padding: "0 7px",
  },
  searchBtn: {
    outline: 0,
    border: 0,
    background: colors.main,
    color: colors.primary,
    cursor: "pointer",
    padding: 5,
  },
  searchInput: {
    flex: 1,
    border: `1px solid ${colors.main}`,
    marginLeft: 20,
    padding: 5,
    "@media(max-width: 500px)": {
      marginLeft: 5,
    },
    "@media(max-width: 350px)": {
      width: 150,
    },
    "&:focus": {
      boxShadow: `1px 1px 3px rgba(0,0,0,0.2)`,
      outline: 0,
    },
  },
  fixedFooter: {
    flex: 1,
    background: colors.primary,
    color: colors.main,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 2000,
    boxShadow: "-2px 0 15 rgba(0,0,0,0.5)",
    // marginLeft: 10,
    // marginRight: 10,
  },
  link: {
    padding: 10,
    color: colors.main,

    "&:hover": {
      backgroundColor: colors.main,
      color: colors.primary,
    },

    "& .MuiTouchRipple-root span": {
      backgroundColor: `${colors.primary} !important`,
      opacity: 0.3,
    },
    flex: 1,
    borderRadius: 0,
    borderRight: `1px solid ${colors.main}`,
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.getCart);
  const { userInfo } = useSelector((state) => state.userLogin);
  // eslint-disable-next-line
  const [cartSize, setCartSize] = useState(userInfo ? cartItems.length : 0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setCartSize(cartItems.length);
  }, [cartItems]);
  const [openSideNav, setOpenSideNav] = useState(false);

  const onCloseHandler = () => setOpenSideNav(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue !== "") {
      document.querySelector(".searchResultContainer").classList.add("show");
      dispatch(searchProduct(searchValue));
    }
  };

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerTitle} onClick={() => history.push("/")}>
          <img src="/images/icon.jpeg" alt="STIGA OUTWEAR" />
          <span>STIGA OUTWEAR</span>
        </div>
        <SearchOuput />
        <form onSubmit={handleSearch} className={classes.search}>
          <input
            className={classes.searchInput}
            type="text"
            placeholder="Search here..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" className={classes.searchBtn}>
            <Search />
          </button>
        </form>
        <Hidden xsDown>
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
                startIcon={
                  <Hidden smDown>
                    <Person fontSize="small" />
                  </Hidden>
                }
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
                startIcon={
                  <Hidden smDown>
                    <Person fontSize="small" />
                  </Hidden>
                }
                size="small"
              >
                Sign In
              </Button>
            )}
          </div>
        </Hidden>
      </div>

      <Hidden xsDown>
        <SideDrawer onCloseHandler={onCloseHandler} openSideNav={openSideNav} />
      </Hidden>
    </>
  );
};

export default Header;
