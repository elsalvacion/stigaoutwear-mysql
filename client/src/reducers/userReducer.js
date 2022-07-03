import {
  USER_LOGIN_FETCHED,
  USER_LOGIN_FETCH_ERROR,
  USER_LOGIN_LOADING,
  USER_LOGOUT,
  USER_REGISTER_FETCHED,
  USER_REGISTER_FETCH_ERROR,
  USER_REGISTER_LOADING,
  USER_DETAILS_LOADING,
  USER_DETAILS_FETCH_ERROR,
  USER_DETAILS_FETCHED,
  USER_DETAILS_RESET,
  USER_UPDATE_LOADING,
  USER_UPDATE_FETCHED,
  USER_UPDATE_FETCH_ERROR,
  USER_UPDATE_PROFILE_RESET,
  USERS_LIST_FETCHED,
  USERS_LIST_FETCH_ERROR,
  USERS_LIST_LOADING,
  USERS_LIST_RESET,
  USER_DELETE_LOADING,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR,
  USER_DELETE_RESET,
  USER_DETAIL_LOADING,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_ERROR,
  USER_DETAIL_RESET,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_RESET,
} from "./types/userTypes";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_LOADING:
      return { loading: true };
    case USER_LOGIN_FETCHED:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FETCH_ERROR:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_LOADING:
      return { loading: true };
    case USER_REGISTER_FETCHED:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FETCH_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case USER_DETAILS_LOADING:
      return { ...state, loading: true };
    case USER_DETAILS_FETCHED:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FETCH_ERROR:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_LOADING:
      return { loading: true };
    case USER_UPDATE_FETCHED:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_FETCH_ERROR:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const usersListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_LIST_LOADING:
      return { loading: true };
    case USERS_LIST_FETCHED:
      return { loading: false, users: action.payload };
    case USERS_LIST_FETCH_ERROR:
      return { loading: false, error: action.payload };
    case USERS_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_LOADING:
      return { loading: true, success: false };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_ERROR:
      return { loading: false, error: action.payload, success: false };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userDetailReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case USER_DETAIL_LOADING:
      return { loading: true };
    case USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAIL_ERROR:
      return { loading: false, error: action.payload };
    case USER_DETAIL_RESET:
      return { user: null };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UPDATE_USER_LOADING:
      return { loading: true };
    case UPDATE_USER_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_USER_ERROR:
      return { loading: false, error: action.payload };
    case UPDATE_USER_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};
