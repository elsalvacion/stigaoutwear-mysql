import React from "react";
import { MenuItem, Menu, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Person } from "@material-ui/icons";
import { logout } from "../actions/userAction";
export default function LoginMenu() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    history.push("/profile");
  };
  const handleOrders = () => {
    setAnchorEl(null);
    history.push("/orders");
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  const handleUsers = () => {
    setAnchorEl(null);
    history.push("/admin/users");
  };

  const handleProducts = () => {
    setAnchorEl(null);
    history.push("/admin/products");
  };

  return (
    <>
      <Button onClick={handleClick} startIcon={<Person />}>
        {userInfo.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {userInfo.isAdmin && (
          <>
            <MenuItem onClick={handleUsers} alignItems="center">
              Users
            </MenuItem>
            <MenuItem onClick={handleProducts} alignItems="center">
              Products
            </MenuItem>
          </>
        )}
        <MenuItem onClick={handleProfile} alignItems="center">
          Profile
        </MenuItem>
        <MenuItem onClick={handleOrders} alignItems="center">
          Orders
        </MenuItem>
        <MenuItem onClick={handleLogout} alignItems="center">
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
