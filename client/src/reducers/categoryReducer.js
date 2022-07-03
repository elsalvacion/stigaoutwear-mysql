import {
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_RESET,
  ADD_CATEGORY_SUCCESS,
  GET_CATEGORY_ERROR,
  GET_CATEGORY_LIST_ERROR,
  GET_CATEGORY_LIST_LOADING,
  GET_CATEGORY_LIST_RESET,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LOADING,
  GET_CATEGORY_RESET,
  GET_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_ERROR,
  REMOVE_CATEGORY_LOADING,
  REMOVE_CATEGORY_RESET,
  REMOVE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_LOADING,
  UPDATE_CATEGORY_RESET,
  UPDATE_CATEGORY_SUCCESS,
} from "./types/categoryType";

export const getCategoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORY_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case GET_CATEGORY_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_CATEGORY_LIST_RESET:
      return {
        categories: [],
      };
    default:
      return state;
  }
};

export const getCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY_LOADING:
      return {
        loading: true,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case GET_CATEGORY_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const addCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY_LOADING:
      return {
        loading: true,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_CATEGORY_ERROR:
      return {
        error: action.payload,
      };
    case ADD_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_LOADING:
      return {
        loading: true,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_CATEGORY_ERROR:
      return {
        error: action.payload,
      };
    case UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const removeCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_CATEGORY_LOADING:
      return {
        loading: true,
      };
    case REMOVE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REMOVE_CATEGORY_ERROR:
      return {
        error: action.payload,
      };
    case REMOVE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
