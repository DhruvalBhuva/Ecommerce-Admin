import React from "react";
import { Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("token");
        if (token) {
          return <Component {...props} />;
        } else {
          navigate(`/signin`);
        }
      }}
    />
  );
  
};

export default PrivateRoute;
