import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckboxTree from "react-checkbox-tree";
import {
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoryAction,
} from "../../actions";
import Modals from "../../components/UI/Modal";
import Layout from "../../components/Layout";
import {
  IoCheckboxOutline,
  IoCheckbox,
  IoArrowDownCircleSharp,
  IoArrowUpCircleSharp,
  IoAddCircleOutline,
  IoTrashSharp,
  IoCloudUploadOutline,
} from "react-icons/io5";
import "./style.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import createCategoryList from "../../helpers/createCategory";
import AddCategoryModal from "./CategoryComponets/AddCategoryModal";
import UpdateCategoryModal from "./CategoryComponets/UpdateCategoryModal";

export const Category = () => {
  const dispatch = useDispatch("");
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModel, setUpdateCategoryModel] = useState(false);
  const [deleteCategoryModel, setDeleteCategoryModel] = useState(false);

  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children), // if condition
      });
    }
    return myCategories;
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleShow = () => setShow(true);

  const handleAddCategorySubmit = () => {
    const form = new FormData();
    console.log("here");
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));

    // After submit clear form
    setCategoryName("");
    setParentCategoryId("");
    setCategoryImage("");

    setShow(false);
  };

  const editCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);

    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const updateCategory = () => {
    setUpdateCategoryModel(true);
    editCheckedAndExpandedCategories();
  };

  const updateCategoriesForm = () => {
    const form = new FormData();

    console.log("here");

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form));

    setUpdateCategoryModel(false);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoryAction(checkedIdsArray));
    }

    setDeleteCategoryModel(false);
  };

  const renderDeleteCategoryModel = () => {
    return (
      <Modals
        modelTitle="Confirm"
        show={deleteCategoryModel}
        handleClose={() => setDeleteCategoryModel(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onclick: () => setDeleteCategoryModel(false),
          },
          {
            label: "Yes",
            color: "danger",
            onclick: deleteCategories,
          },
        ]}
      >
        <h6>Expanded</h6>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name} </span>
        ))}
        <hr />
        <h6>Checked</h6>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name} </span>
        ))}
      </Modals>
    );
  };

  const deleteCategory = () => {
    editCheckedAndExpandedCategories();
    setDeleteCategoryModel(true);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className="topContainer">
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span>Actions: </span>
                <button onClick={handleShow}>
                  <IoAddCircleOutline /> <span> Add </span>
                </button>
                <button onClick={deleteCategory}>
                  <IoTrashSharp /> <span> Delete </span>
                </button>
                <button onClick={updateCategory}>
                  <IoCloudUploadOutline /> <span> Edit </span>
                </button>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            {/* React-checkbox-tree */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoCheckbox />,
                uncheck: <IoCheckboxOutline />,
                halfCheck: <IoCheckboxOutline />,
                expandClose: <IoArrowDownCircleSharp />,
                expandOpen: <IoArrowUpCircleSharp />,
              }}
            />
          </Col>
        </Row>
      </Container>

      {/* To add categories */}
      <AddCategoryModal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleAddCategorySubmit}
        modalTitle={"Add New Categories"}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        handleCategoryImage={handleCategoryImage}
      />

      {/* Edit categories */}
      <UpdateCategoryModal
        show={updateCategoryModel}
        handleClose={() => setUpdateCategoryModel(false)}
        onSubmit={updateCategoriesForm}
        modalTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        handleCategoryImage={handleCategoryImage}
      />

      {/* Delete Categories */}
      {renderDeleteCategoryModel()}
    </Layout>
  );
};
