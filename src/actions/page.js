import * as API from "../APIs/APIs";
import { pageConstants } from "./constants";

export const createPage = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });

    try {
      const res = await API.createPage(form);

      if (res.status === 201) {
        dispatch({
          type: pageConstants.CREATE_PAGE_SUCSESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: pageConstants.CREATE_PAGE_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
