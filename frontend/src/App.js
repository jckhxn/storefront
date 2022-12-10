import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import SuccessScreen from "./screens/SuccessScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { useDispatch, useSelector } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import Logout from "./screens/Logout";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";
import UsersScreen from "./screens/UsersScreen";
import StripeScreen from "./screens/StripeScreen";
import { logout } from "../../frontend/src/actions/userActions";
import header from "./img/header.jpg";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [productCategories, setCategories] = useState([]);

  // const getProductCategories = async () => {
  //   const response = fetch("https://api.jackhixon.com/api/storefront/products")
  //     .then((res) => res.json())
  //     .then((data) => setCategories(data));
  // };
  // useEffect(() => {
  //   getProductCategories();
  // }, []);

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <BrowserRouter>
      {/* This here be the logo */}
      {/* <div className="logo-class">
        <Link to="/">
          {" "}
          <img src={header} alt=""></img>
        </Link>
      </div> */}
      <div className="grid-container">
        <header className="header ">
          <div className="brand">
            {/* <button onClick={openMenu}>&#9776;</button> */}
          </div>
          <div className="header-links ">
            <NavBar />

            {userInfo ? (
              <div className="dropdown">
                <Link to="/profile">{userInfo.name}</Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/Profile">Profile</Link>
                    <Link to="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin"></Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/users">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main className="main">
          <div className="content">
            <Route path="/stripe" component={StripeScreen} />
            <Route path="/users" component={UsersScreen} />
            <Route path="/success" component={SuccessScreen} />
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <Footer />
        {/* <footer className="footer">All rights reserved.</footer> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
