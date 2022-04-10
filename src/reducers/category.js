import { categoryConstant } from "../actions/constants";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCatList = [];

  // If there are no parents
  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        type: category.type,
        children: [],
      },
    ];
  }

  //If there are parents and newly category is child
  for (let cat of categories) {
    if (cat._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        type: category.type,
        children: [],
      };

      myCatList.push({
        ...cat,
        children:
          cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      myCatList.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }
  return myCatList;
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConstant.GET_ALL_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case categoryConstant.GET_ALL_CATEGORY_SUUCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;

    case categoryConstant.GET_ALL_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );

      state = {
        ...state,

        //update category without refresh
        categories: updatedCategories,
        loading: false,
      };
      break;

    case categoryConstant.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case categoryConstant.UPDATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case categoryConstant.UPDATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case categoryConstant.UPDATE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case categoryConstant.DELETE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case categoryConstant.DELETE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case categoryConstant.DELETE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default categoryReducer;
