import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrdersScreen from "./screens/OrdersScreen";
import UsersScreen from "./screens/UsersScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import CreateProduct from "./screens/CreateProduct";
import EditProductScreen from "./screens/EditProductScreen";
import OrderListScreen from "./screens/OrderListScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CategoryListScreen from "./screens/CategoryListScreen";
import EditCategoryScreen from "./screens/EditCategoryScreen";
import TopProducts from "./components/TopProducts";
import BottomFooter from "./components/BottomFooter";
import NotFoundScreen from "./screens/NotFoundScreen";

const useStyles = makeStyles((theme) => ({
  screensContainer: {
    marginTop: 15,
  },
  title: {
    marginTop: 10,
  },
  app: {
    position: "relative",
    minHeight: "100vh",
    paddingBottom: 200,
  },
}));
function App() {
  const classes = useStyles();

  return (
    <>
      <div id="back-to-top-anchor"></div>
      <div className={classes.app}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <TopProducts />
              <br />
              <HomeScreen />
            </Route>
            <Route
              exact
              path="/category/:category"
              component={CategoryScreen}
            />
            <Container className={classes.screensContainer}>
              <Route exact path="/product/:id" component={ProductScreen} />
              <Route exact path="/cart" component={CartScreen} />
              <Route exact path="/shipping" component={ShippingScreen} />
              <Route exact path="/payment" component={PaymentScreen} />
              <Route exact path="/placeorder" component={PlaceOrderScreen} />
              <Route exact path="/order/:id/" component={OrderScreen} />
              <Route exact path="/orders" component={OrdersScreen} />
              <Route exact path="/login" component={LoginScreen} />
              <Route
                exact
                path="/admin/products"
                component={ProductListScreen}
              />
              <Route
                exact
                path="/admin/categories"
                component={CategoryListScreen}
              />
              <Route
                exact
                path="/admin/category/edit/:id"
                component={EditCategoryScreen}
              />
              <Route
                exact
                path="/admin/product/create"
                component={CreateProduct}
              />
              <Route exact path="/admin/users" component={UsersScreen} />
              <Route
                exact
                path="/admin/user/edit/:id"
                component={UserEditScreen}
              />
              <Route
                exact
                path="/admin/product/edit/:id"
                component={EditProductScreen}
              />
              <Route exact path="/admin/orders" component={OrderListScreen} />
              <Route exact path="/register" component={RegisterScreen} />
              <Route exact path="/profile" component={ProfileScreen} />
            </Container>
            <Route component={NotFoundScreen} />
          </Switch>
          <BottomFooter />
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
