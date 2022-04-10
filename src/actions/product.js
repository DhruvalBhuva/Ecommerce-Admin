import * as API from "../APIs/APIs";

export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await API.addProduct(form);
  };
};
