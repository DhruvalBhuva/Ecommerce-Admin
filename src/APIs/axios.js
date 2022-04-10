import axios from "axios";
import { api } from "./urlConfig";
import store from "../store";
import { authConstants } from "../actions/constants";

const token = window.localStorage.getItem("token");

const axiosInsance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? ` Bearer ${token}` : "",
  },
});

axiosInsance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosInsance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    /**
     * we can't dispatch action out of component using useDispatch hook.
     * that's why dispatch using store
     */
    const { status } = error.request;
    if (status === 500) {
      localStorage.clear();
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);
export default axiosInsance;
