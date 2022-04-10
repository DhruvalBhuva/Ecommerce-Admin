import { UserConstant } from "../actions/constants";

const initialState = {
  error: null,
  message: "",
  loading: false,
  pointer: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserConstant.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
        pointer: false,
      };

      break;
    case UserConstant.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        pointer: true,
        message: action.payload.message,
      };

      break;
    case UserConstant.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        pointer: false,

        error: action.payload.error,
      };

      break;
    default:
      return state;
  }
  return state;
};

export default userReducer;
