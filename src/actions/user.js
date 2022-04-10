import * as API from "../APIs/APIs";

import { UserConstant } from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: UserConstant.USER_REGISTER_REQUEST });

    const res = await API.signUp(user);

    if (res.status === 201) {
      const { message } = res.data;

      dispatch({
        type: UserConstant.USER_REGISTER_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: UserConstant.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
          // payload: { error: message },
        });
      }
    }
  };
};
