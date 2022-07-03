import {
  PRODUCT_LIST_FETCHED,
  PRODUCT_LIST_LOADING,
  PRODUCT_LIST_ERROR,
  PRODUCT_DETAILS_LOADING,
  PRODUCT_DETAILS_FETCHED,
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DELETE_LOADING,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR,
  PRODUCT_CREATE_LOADING,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_ERROR,
  PRODUCT_EDIT_LOADING,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_ERROR,
  PRODUCT_CREATE_REVIEW_LOADING,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_ERROR,
  PRODUCT_SEARCH_LOADING,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_ERROR,
  PRODUCT_TOP_LOADING,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_ERROR,
  FIRST_CATEGORY_LOADING,
  FIRST_CATEGORY_SUCCESS,
  FIRST_CATEGORY_ERROR,
  SECOND_CATEGORY_LOADING,
  SECOND_CATEGORY_SUCCESS,
  SECOND_CATEGORY_ERROR,
  CATEGORY_LOADING,
  CATEGORY_SUCCESS,
  CATEGORY_ERROR,
} from "../reducers/types/productsTypes";
import axios from "axios";
import { logout } from "./userAction";

export const fetchProductsList =
  (keyword = "", page = 1, category = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_LOADING,
        payload: keyword,
      });

      const res = await axios.get(
        `/products?page=${page}&keyword=${keyword}&category=${category}`
      );

      dispatch({
        type: PRODUCT_LIST_FETCHED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_ERROR,
        payload: error.response.data,
      });
    }
  };

export const getCategory =
  (keyword = "", page = 1, limit = 50, category = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: CATEGORY_LOADING,
        payload: keyword,
      });

      const res = await axios.get(
        `/products?page=${page}&keyword=${keyword}&category=${category}&limit=${limit}`
      );

      dispatch({
        type: CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_ERROR,
        payload: error.response.data,
      });
    }
  };

export const getFirstCategory =
  (keyword = "", page = 1, category = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: FIRST_CATEGORY_LOADING,
        payload: keyword,
      });

      const res = await axios.get(
        `/products?page=${page}&keyword=${keyword}&category=${category}`
      );

      dispatch({
        type: FIRST_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: FIRST_CATEGORY_ERROR,
        payload: error.response.data,
      });
    }
  };

export const getSecondCategory =
  (keyword = "", page = 1, category = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: SECOND_CATEGORY_LOADING,
        payload: keyword,
      });

      const res = await axios.get(
        `/products?page=${page}&keyword=${keyword}&category=${category}`
      );

      dispatch({
        type: SECOND_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: SECOND_CATEGORY_ERROR,
        payload: error.response.data,
      });
    }
  };

export const searchProduct =
  (keyword = "", page = 1, limit = 3, category = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_SEARCH_LOADING,
        payload: keyword,
      });

      const { data } = await axios.get(
        `/products?keyword=${keyword}&page=${page}&limit=${limit}&category=${category}`
      );

      dispatch({
        type: PRODUCT_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_SEARCH_ERROR,
        payload: error.response.data,
      });
    }
  };

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_LOADING,
    });

    const res = await axios.get(`/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_FETCHED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_DETAILS_ERROR,
      payload: error.response.data,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/products`, product, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
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
      type: PRODUCT_CREATE_ERROR,
      payload: message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_EDIT_LOADING,
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
      `/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_EDIT_SUCCESS,
      payload: data,
    });
    dispatch({ type: PRODUCT_DETAILS_FETCHED, payload: data });
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
      type: PRODUCT_EDIT_ERROR,
      payload: message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
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
      type: PRODUCT_DELETE_ERROR,
      payload: message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_LOADING,
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

      const { data } = await axios.post(`/review/${productId}`, review, config);

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
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
        type: PRODUCT_CREATE_REVIEW_ERROR,
        payload: message,
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_LOADING });

    const { data } = await axios.get(`/products/top/products`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_ERROR,
      payload: error.response.data,
    });
  }
};
