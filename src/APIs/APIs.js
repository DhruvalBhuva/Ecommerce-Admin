import axiosInsance from "./axios";

/** Authentication */
export const signIn = (user) => axiosInsance.post("/signin", { ...user });
export const signUp = (user) => axiosInsance.post("/signup", { ...user });
export const signOut = () => axiosInsance.post("/signout");

/** Initial Data */
export const getInitialData = () => axiosInsance.post("/initialdata");

/** Categories */
export const getAllCategory = () => axiosInsance.get("/category/getcategory");
export const addCategory = (form) =>
  axiosInsance.post(`/category/create`, form);
export const updateCategories = (form) =>
  axiosInsance.post(`/category/update`, form);
export const deleteCategories = (idsArray) =>
  axiosInsance.post(`/category/delete`, {
    payload: { idsArray },
  });

/** Products */
export const addProduct = (form) => axiosInsance.post("/product/create", form);

/** Page */
export const createPage = (form) => axiosInsance.post("/page/create", form);

