import { authConstants } from "./constants";
import * as API from "../APIs/APIs";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    const res = await API.signIn(user);

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Set the AUTH token for any request
      // axiosInsance.interceptors.request.use(function (config) {
      //   config.headers.Authorization = `Bearer ${token}`;
      //   return config;
      // });

      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 404) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });

    const res = await API.signOut();
    console.log({ res });

    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
