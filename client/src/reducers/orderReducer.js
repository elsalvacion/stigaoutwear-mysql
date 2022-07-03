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
  ORDER_PAY_FAIL,
  ORDER_PAY_LOADING,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_LOADING,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_ERROR,
  ORDER_LIST_RESET,
  ORDER_DELETE_LOADING,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_ERROR,
  ORDER_DELETE_RESET,
  ORDER_MARK_PAY_LOADING,
  ORDER_MARK_PAY_SUCCESS,
  ORDER_MARK_PAY_ERROR,
  ORDER_MARK_PAY_RESET,
  ORDER_DELIVER_LOADING,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_ERROR,
  ORDER_DELIVER_RESET,
  CREATE_ORDER_RESET,
} from "./types/orderTypes";

export const createOrderReducer = (state = { order: null }, action) => {
  switch (action.type) {
    case CREATE_ORDER_LOADING:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_ORDER_RESET:
      return {
        order: null,
      };

    default:
      return state;
  }
};

export const fetchOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case FETCH_ORDERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orders: action.payload,
      };
    case FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const fetchOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDER_LOADING:
      return {
        loading: true,
      };
    case FETCH_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case FETCH_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_LOADING:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_LOADING:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_ERROR:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_LOADING:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderMarkPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_MARK_PAY_LOADING:
      return {
        loading: true,
      };
    case ORDER_MARK_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_MARK_PAY_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_MARK_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderMarkDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_LOADING:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
