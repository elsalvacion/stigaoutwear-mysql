import {
  PRODUCT_LIST_LOADING,
  PRODUCT_LIST_FETCHED,
  PRODUCT_LIST_ERROR,
  PRODUCT_DETAILS_LOADING,
  PRODUCT_DETAILS_FETCHED,
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DELETE_LOADING,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_ERROR,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_LOADING,
  PRODUCT_EDIT_LOADING,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_RESET,
  PRODUCT_EDIT_ERROR,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_ERROR,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_LOADING,
  PRODUCT_SEARCH_LOADING,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_ERROR,
  PRODUCT_SEARCH_RESET,
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
  PRODUCT_DETAILS_RESET,
} from "./types/productsTypes";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_LOADING:
      return { products: [], loading: true, keyword: action.payload };
    case PRODUCT_LIST_FETCHED:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
        count: action.payload.count,
        pagination: action.payload.pagination,
      };
    case PRODUCT_LIST_ERROR:
      return { ...state, products: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LOADING:
      return { products: [], loading: true, keyword: action.payload };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
        count: action.payload.count,
        pagination: action.payload.pagination,
      };
    case CATEGORY_ERROR:
      return { ...state, products: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export const firstCategoryReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FIRST_CATEGORY_LOADING:
      return { products: [], loading: true, keyword: action.payload };
    case FIRST_CATEGORY_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
        count: action.payload.count,
        pagination: action.payload.pagination,
      };
    case FIRST_CATEGORY_ERROR:
      return { ...state, products: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export const secondCategoryReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case SECOND_CATEGORY_LOADING:
      return { products: [], loading: true, keyword: action.payload };
    case SECOND_CATEGORY_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
        count: action.payload.count,
        pagination: action.payload.pagination,
      };
    case SECOND_CATEGORY_ERROR:
      return { ...state, products: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: null }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_LOADING:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_FETCHED:
      return { product: action.payload, loading: false };
    case PRODUCT_DETAILS_ERROR:
      return { loading: false, error: action.payload, ...state };
    case PRODUCT_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_LOADING:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_ERROR:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_LOADING:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_ERROR:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_EDIT_LOADING:
      return { loading: true };
    case PRODUCT_EDIT_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_EDIT_ERROR:
      return { loading: false, error: action.payload };
    case PRODUCT_EDIT_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_LOADING:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_ERROR:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productSearchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_LOADING:
      return { products: [], loading: true, keyword: action.payload };
    case PRODUCT_SEARCH_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
        count: action.payload.count,
        pagination: action.payload.pagination,
      };
    case PRODUCT_SEARCH_ERROR:
      return { ...state, products: [], loading: false, error: action.payload };
    case PRODUCT_SEARCH_RESET:
      return {
        products: [],
      };
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_LOADING:
      return { ...state, loading: true };
    case PRODUCT_TOP_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case PRODUCT_TOP_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
