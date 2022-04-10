import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
// import PrivateRoute from "./components/HOC/PrivateRoute";
import { isUserLoggedIn, getInitialData } from "./actions";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import { Category } from "./containers/Category";
import NewPage from "./containers/NewPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = window.localStorage.getItem("token");

  // After login to prevent uset to move in signin page
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={token ? <Home /> : <Signin />} />
          <Route
            path="/page"
            exact
            element={token ? <NewPage /> : <Signin />}
          />
          <Route
            path="/product"
            exact
            element={token ? <Products /> : <Signin />}
          />
          <Route
            path="/order"
            exact
            element={token ? <Orders /> : <Signin />}
          />
          <Route
            path="/category"
            exact
            element={token ? <Category /> : <Signin />}
          />

          <Route path="/signin" exact element={<Signin />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
