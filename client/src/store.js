import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productSearchReducer,
  productTopRatedReducer,
  firstCategoryReducer,
  secondCategoryReducer,
  categoryReducer,
} from "./reducers/productReducer";

import {
  addCartReducer,
  editQtyReducer,
  getCartReducer,
  getSelectedCartReducer,
  removeCartReducer,
  shippingInfoReducer,
  updateCartReducer,
} from "./reducers/cartReducer";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  usersListReducer,
  userDeleteReducer,
  userDetailReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  createOrderReducer,
  fetchOrderReducer,
  fetchOrdersReducer,
  orderDeleteReducer,
  orderListReducer,
  orderMarkDeliverReducer,
  orderMarkPayReducer,
  orderPayReducer,
} from "./reducers/orderReducer";
import { getCart } from "./actions/cartAction";
import {
  getCategoryReducer,
  addCategoryReducer,
  updateCategoryReducer,
  removeCategoryReducer,
  getCategoryListReducer,
} from "./reducers/categoryReducer";

const reducer = combineReducers({
  categoryList: getCategoryListReducer,
  getCategory: getCategoryReducer,
  addCategory: addCategoryReducer,
  updateCategory: updateCategoryReducer,
  removeCategory: removeCategoryReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productSearch: productSearchReducer,
  productTopRated: productTopRatedReducer,
  firstCategory: firstCategoryReducer,
  secondCategory: secondCategoryReducer,
  category: categoryReducer,
  getCart: getCartReducer,
  addCart: addCartReducer,
  selectedCart: getSelectedCartReducer,
  updateCart: updateCartReducer,
  removeCart: removeCartReducer,
  shippingInfo: shippingInfoReducer,
  editQty: editQtyReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userDetail: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  usersList: usersListReducer,
  userDelete: userDeleteReducer,
  orderCreate: createOrderReducer,
  ordersFetch: fetchOrdersReducer,
  orderFetch: fetchOrderReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderMarkPay: orderMarkPayReducer,
  orderMarkDeliver: orderMarkDeliverReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

if (userInfoFromStorage) {
  store.dispatch(getCart());
}

export default store;
