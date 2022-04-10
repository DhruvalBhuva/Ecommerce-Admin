import { categoryConstant, productConstants } from "./constants";
import * as API from "../APIs/APIs";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await API.getInitialData();

    if (res.status === 200) {
      const { categories, products } = res.data;

      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_SUUCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCT_SUUCESS,
        payload: { products },
      });
    } else {
      console.log("else");
    }
  };
};
