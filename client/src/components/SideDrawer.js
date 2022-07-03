import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import colors from "../utils/Colors";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userAction";

const drawerWidth = 240;
const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: colors.main,
    color: colors.primary,
  },
});

const SideDrawer = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();

  const handleClick = (path) => {
    history.push(path);
    props.onCloseHandler();
  };
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <SwipeableDrawer
      anchor="left"
      className={classes.drawer}
      variant="temporary"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={props.openSideNav}
      onClose={props.onCloseHandler}
    >
      <List>
        <ListItem button onClick={() => handleClick("/")} alignItems="center">
          <ListItemText>Home</ListItemText>
        </ListItem>

        {userInfo && userInfo.isAdmin && (
          <>
            <ListItem
              button
              onClick={() => handleClick("/admin/users")}
              alignItems="center"
            >
              <ListItemText>Users</ListItemText>
            </ListItem>
            <ListItem
              button
              onClick={() => handleClick("/admin/categories")}
              alignItems="center"
            >
              <ListItemText>Categories</ListItemText>
            </ListItem>
            <ListItem
              button
              onClick={() => handleClick("/admin/products")}
              alignItems="center"
            >
              <ListItemText>Products</ListItemText>
            </ListItem>
          </>
        )}
        {userInfo && (
          <>
            <ListItem
              button
              onClick={() =>
                handleClick(userInfo.isAdmin ? `/admin/orders` : `/orders`)
              }
              alignItems="center"
            >
              <ListItemText>Orders</ListItemText>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                dispatch(logout());
                props.onCloseHandler();
              }}
              alignItems="center"
            >
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </SwipeableDrawer>
  );
};

export default SideDrawer;
