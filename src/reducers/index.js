import { combineReducers } from "redux";
import authReducer from "./auth";
import orderReducer from "./order";
import userReducer from "./user";
import categoryReducer from "./category";
import productReducer from "./product";
import pageReducer from "./page";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  order: orderReducer,
  category: categoryReducer,
  product: productReducer,
  page: pageReducer,
});

export default rootReducer;
