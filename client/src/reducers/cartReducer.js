import {
  ADD_CART_ERROR,
  ADD_CART_LOADING,
  ADD_CART_RESET,
  ADD_CART_SUCCESS,
  UPDATE_CART_ERROR,
  UPDATE_CART_LOADING,
  UPDATE_CART_RESET,
  UPDATE_CART_SUCCESS,
  GET_CART_ERROR,
  GET_CART_LOADING,
  GET_CART_RESET,
  GET_CART_SUCCESS,
  REMOVE_CART_ERROR,
  REMOVE_CART_LOADING,
  REMOVE_CART_RESET,
  REMOVE_CART_SUCCESS,
  SHIPPING_INFO_RESET,
  SHIPPING_INFO_SUCCESS,
  EDIT_QTY_LOADING,
  EDIT_QTY_SUCCESS,
  EDIT_QTY_ERROR,
  EDIT_QTY_RESET,
  GET_SELECTED_CART_LOADING,
  GET_SELECTED_CART_ERROR,
  GET_SELECTED_CART_RESET,
  GET_SELECTED_CART_SUCCESS,
} from "./types/cartTypes";

export const getCartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case GET_CART_LOADING:
      return { ...state, loading: true };
    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        cartItems: action.payload,
      };
    case GET_CART_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_CART_RESET:
      return { cartItems: [] };
    default:
      return state;
  }
};

export const getSelectedCartReducer = (state = { selected: [] }, action) => {
  switch (action.type) {
    case GET_SELECTED_CART_LOADING:
      return { ...state, loading: true };
    case GET_SELECTED_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        selected: action.payload,
      };
    case GET_SELECTED_CART_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_SELECTED_CART_RESET:
      return { selected: [] };
    default:
      return state;
  }
};

export const addCartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CART_LOADING:
      return { loading: true };
    case ADD_CART_SUCCESS:
      return { loading: false, success: true };
    case ADD_CART_ERROR:
      return { loading: false, error: action.payload };
    case ADD_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const removeCartReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_CART_LOADING:
      return { loading: true };
    case REMOVE_CART_SUCCESS:
      return { loading: false, success: true };
    case REMOVE_CART_ERROR:
      return { loading: false, error: action.payload };
    case REMOVE_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const updateCartReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CART_LOADING:
      return { loading: true };
    case UPDATE_CART_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_CART_ERROR:
      return { loading: false, error: action.payload };
    case UPDATE_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const editQtyReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_QTY_LOADING:
      return { loading: true };
    case EDIT_QTY_SUCCESS:
      return { loading: false, success: true };
    case EDIT_QTY_ERROR:
      return { loading: false, error: action.payload };
    case EDIT_QTY_RESET:
      return {};
    default:
      return state;
  }
};

export const shippingInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case SHIPPING_INFO_SUCCESS:
      return { shippingInfo: action.payload, success: true };
    case SHIPPING_INFO_RESET:
      return {};
    default:
      return state;
  }
};
