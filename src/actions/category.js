import { categoryConstant } from "./constants";
import * as API from "../APIs/APIs";

const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST });

    try {
      const res = await API.getAllCategory();
      const { categoryList } = res.data;

      if (res.status === 200) {
        dispatch({
          type: categoryConstant.GET_ALL_CATEGORY_SUUCESS,
          payload: { categories: categoryList },
        });
      } else {
        dispatch({
          type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_REQUEST });

    try {
      const res = await API.addCategory(form);

      if (res.status === 200) {
        dispatch({
          type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        dispatch({
          type: categoryConstant.ADD_NEW_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.UPDATE_CATEGORY_REQUEST });
    try {
      const res = await API.updateCategories(form);

      if (res.status === 200) {
        dispatch({ type: categoryConstant.UPDATE_CATEGORY_SUCCESS });
        dispatch(getAllCategory());
      } else {
        dispatch({
          type: categoryConstant.UPDATE_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const deleteCategories = (idsArray) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.DELETE_CATEGORY_REQUEST });

    try {
      const res = await API.deleteCategories(idsArray);
      if (res.status === 200) {
        dispatch(getAllCategory());
        dispatch({ type: categoryConstant.DELETE_CATEGORY_SUCCESS });
      } else {
        dispatch({
          type: categoryConstant.DELETE_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export { getAllCategory };
