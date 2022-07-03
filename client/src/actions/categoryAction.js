import axios from "axios";
import {
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_SUCCESS,
  GET_CATEGORY_ERROR,
  GET_CATEGORY_LIST_ERROR,
  GET_CATEGORY_LIST_LOADING,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LOADING,
  GET_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_ERROR,
  REMOVE_CATEGORY_LOADING,
  REMOVE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_LOADING,
  UPDATE_CATEGORY_SUCCESS,
} from "../reducers/types/categoryType";
import { logout } from "./userAction";

export const addCategory = (title) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_CATEGORY_LOADING,
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
    const { data } = await axios.post(
      `/category`,
      {
        title,
      },
      config
    );

    if (data) {
      dispatch({
        type: ADD_CATEGORY_SUCCESS,
      });
    }
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: ADD_CATEGORY_ERROR,
      payload: message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_CATEGORY_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/category/${id}`, config);

    if (data) {
      dispatch({
        type: REMOVE_CATEGORY_SUCCESS,
      });
    }
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: REMOVE_CATEGORY_ERROR,
      payload: message,
    });
  }
};

export const getCategories = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CATEGORY_LIST_LOADING,
    });

    const { data } = await axios.get(`/category`);

    if (data) {
      dispatch({
        type: GET_CATEGORY_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: GET_CATEGORY_LIST_ERROR,
      payload: message,
    });
  }
};

export const getCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CATEGORY_LOADING,
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

    const { data } = await axios.get(`/category/${id}`, config);

    if (data) {
      dispatch({
        type: GET_CATEGORY_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: GET_CATEGORY_ERROR,
      payload: message,
    });
  }
};

export const updateCategory = (id, title) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_CATEGORY_LOADING,
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

    const { data } = await axios.put(`/category/${id}`, { title }, config);

    if (data) {
      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
      });
    }
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: UPDATE_CATEGORY_ERROR,
      payload: message,
    });
  }
};
