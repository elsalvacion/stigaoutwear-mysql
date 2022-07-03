import axios from "axios";
import {
  ADD_CART_LOADING,
  ADD_CART_ERROR,
  REMOVE_CART_LOADING,
  ADD_CART_SUCCESS,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_ERROR,
  GET_CART_LOADING,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  UPDATE_CART_LOADING,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_ERROR,
  SHIPPING_INFO_SUCCESS,
  EDIT_QTY_LOADING,
  EDIT_QTY_SUCCESS,
  EDIT_QTY_ERROR,
} from "../reducers/types/cartTypes";
import { logout } from "./userAction";

export const addToCart = (id, qty, size) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_CART_LOADING,
    });
    const { data } = await axios.get(`/products/${id}`);

    const payload = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.discount
        ? Number((100 - data.discount) * 0.01 * data.price).toFixed(2)
        : data.price,
      countInStock: data.countInStock,
      qty,
      selected: false,
      size: String(size),
    };

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data: cartData } = await axios.put(
      `/cart/${payload.product}`,
      payload,
      config
    );

    if (cartData) {
      dispatch({
        type: ADD_CART_SUCCESS,
      });
      dispatch(getCart());
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
      type: ADD_CART_ERROR,
      payload: message,
    });
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_CART_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data: cartData } = await axios.delete(`/cart/${id}`, config);

    if (cartData) {
      dispatch({
        type: REMOVE_CART_SUCCESS,
      });
      dispatch(getCart());
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
      type: REMOVE_CART_ERROR,
      payload: message,
    });
  }
};

export const getCart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CART_LOADING,
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

    const { data: cartData } = await axios.get(`/cart`, config);

    if (cartData) {
      dispatch({
        type: GET_CART_SUCCESS,
        payload: cartData,
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
      type: GET_CART_ERROR,
      payload: message,
    });
  }
};

export const updateCart = (id, item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_CART_LOADING,
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

    const { data: cartData } = await axios.put(`/cart/${id}`, item, config);

    if (cartData) {
      dispatch({
        type: UPDATE_CART_SUCCESS,
      });
      dispatch(getCart());
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
      type: UPDATE_CART_ERROR,
      payload: message,
    });
  }
};

export const saveShippingInfo = (info) => async (dispatch) => {
  dispatch({
    type: SHIPPING_INFO_SUCCESS,
    payload: info,
  });
};

export const editQuantity = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_QTY_LOADING,
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

    const { data: cartData } = await axios.put(
      `/cart/qty/${id}`,
      {
        qty,
      },
      config
    );

    if (cartData) {
      dispatch({
        type: EDIT_QTY_SUCCESS,
      });
      dispatch(getCart());
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
      type: EDIT_QTY_ERROR,
      payload: message,
    });
  }
};
