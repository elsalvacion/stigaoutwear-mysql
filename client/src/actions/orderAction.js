import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_LOADING,
  FETCH_ORDER_LOADING,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL,
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_LOADING,
  ORDER_PAY_FAIL,
  ORDER_LIST_LOADING,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_ERROR,
  ORDER_DELETE_LOADING,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_ERROR,
  ORDER_MARK_PAY_LOADING,
  ORDER_MARK_PAY_SUCCESS,
  ORDER_MARK_PAY_ERROR,
  ORDER_DELIVER_LOADING,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_ERROR,
} from "../reducers/types/orderTypes";
import axios from "axios";
import { logout } from "../actions/userAction";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_LOADING,
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

    const { data } = await axios.post(`/orders`, order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
    // dispatch({
    //   type: CART_CLEAR_ITEMS,
    //   payload: data,
    // })
    // localStorage.removeItem('cartItems')
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: message,
    });
  }
};

export const fetchOrders = (limit) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_ORDERS_LOADING,
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
    let url;
    if (limit) url = `/orders/myorder?limit=${limit}`;
    else url = `/orders/myorder`;

    const { data } = await axios.get(url, config);
    dispatch({
      type: FETCH_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: FETCH_ORDERS_FAIL,
      payload: message,
    });
  }
};

export const fetchOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_ORDER_LOADING,
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

    const { data } = await axios.get(`/orders/${id}`, config);

    dispatch({
      type: FETCH_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response.data;
    if (
      message === "Not Authorized: No Token" ||
      message === "Not Authorized: Invalid User"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: FETCH_ORDER_FAIL,
      payload: message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_LOADING,
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

      const { data } = await axios.put(
        `/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
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
        type: ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };

export const markOrderPay = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_MARK_PAY_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/orders/${orderId}/adminpay`, {}, config);

    dispatch({
      type: ORDER_MARK_PAY_SUCCESS,
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
      type: ORDER_MARK_PAY_ERROR,
      payload: message,
    });
  }
};

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/orders/${id}/admindeliver`, {}, config);

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
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
      type: ORDER_DELIVER_ERROR,
      payload: message,
    });
  }
};

export const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
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
      type: ORDER_LIST_ERROR,
      payload: message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELETE_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/orders/${id}`, config);

    dispatch({
      type: ORDER_DELETE_SUCCESS,
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
      type: ORDER_DELETE_ERROR,
      payload: message,
    });
  }
};
