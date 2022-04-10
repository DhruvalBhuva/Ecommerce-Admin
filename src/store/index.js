import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

/**
 * composeWithDevTools is use to see all the action and state form browser
 */
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
