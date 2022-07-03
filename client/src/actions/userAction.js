import {
  UPDATE_USER_ERROR,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  USERS_LIST_FETCHED,
  USERS_LIST_FETCH_ERROR,
  USERS_LIST_LOADING,
  USERS_LIST_RESET,
  USER_DELETE_ERROR,
  USER_DELETE_LOADING,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FETCHED,
  USER_DETAILS_FETCH_ERROR,
  USER_DETAILS_LOADING,
  USER_DETAILS_RESET,
  USER_DETAIL_ERROR,
  USER_DETAIL_LOADING,
  USER_DETAIL_SUCCESS,
  USER_LOGIN_FETCHED,
  USER_LOGIN_FETCH_ERROR,
  USER_LOGIN_LOADING,
  USER_LOGOUT,
  USER_REGISTER_FETCHED,
  USER_REGISTER_FETCH_ERROR,
  USER_REGISTER_LOADING,
  USER_UPDATE_FETCHED,
  USER_UPDATE_FETCH_ERROR,
  USER_UPDATE_LOADING,
  USER_UPDATE_PROFILE_RESET,
} from "../reducers/types/userTypes";

import { getCart } from "./cartAction";
import axios from "axios";
import { GET_CART_RESET } from "../reducers/types/cartTypes";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/users/login",
      { email, password },
      config
    );

    if (data) {
      dispatch({
        type: USER_LOGIN_FETCHED,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(getCart());
      console.log("login");
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FETCH_ERROR,
      payload: error.response.data,
    });
  }
};

export const registerUser = (email, password, name) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/users/register",
      { email, password, name },
      config
    );

    dispatch({
      type: USER_REGISTER_FETCHED,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_FETCHED,
      payload: data,
    });

    if (data) {
      dispatch({
        type: USER_LOGIN_FETCHED,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(getCart());
      console.log("register");
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FETCH_ERROR,
      payload: error.response.data,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/users/profile`, config);

    dispatch({
      type: USER_DETAILS_FETCHED,
      payload: data,
    });
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User" ||
      message === "Not authorized as an admin"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FETCH_ERROR,
      payload: message,
    });
  }
};

export const userDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/users/${id}`, config);

    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User" ||
      message === "Not authorized as an admin"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAIL_ERROR,
      payload: message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_FETCHED,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_FETCHED,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User" ||
      message === "Not authorized as an admin"
    ) {
      dispatch(logout());
    }

    dispatch({
      type: USER_UPDATE_FETCH_ERROR,
      payload: message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_USER_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/users/${user.id}`, user, config);

    dispatch({ type: UPDATE_USER_SUCCESS });

    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });

    dispatch({ type: USER_DETAILS_RESET });
    if (data._id === userInfo._id) {
      dispatch(logout());
    }
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User" ||
      message === "Not authorized as an admin"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: UPDATE_USER_ERROR,
      payload: message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
  dispatch({ type: USERS_LIST_RESET });
  dispatch({ type: GET_CART_RESET });

  document.location.href = "/";
};

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/users`, config);

    dispatch({
      type: USERS_LIST_FETCHED,
      payload: data,
    });
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User" ||
      message === "Not authorized as an admin"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: USERS_LIST_FETCH_ERROR,
      payload: message,
    });
  }
};

export const userDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/users/${id}`, config);
    if (data) {
      dispatch(getUsers());
      dispatch({
        type: USER_DELETE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User" ||
      message === "Not authorized as an admin"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: USER_DELETE_ERROR,
      payload: message,
    });
  }
};
