import React from "react";
import { useSelector } from "react-redux";

import Input from "../../../components/UI/Input";
import Modals from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";
import createCategoryList from "../../../helpers/createCategory";

const AddCategoryModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        handleCategoryImage,
        onSubmit,
    } = props;
    const category = useSelector((state) => state.category);

    return (
        <Modals
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modelTitle={modalTitle}
        >
            <hr />
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={"Category Name"}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control"
                    />
                </Col>
                <Col>
                    <select
                        className="form-control"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}
                    >
                        <option>Select Category</option>

                        {createCategoryList(category.categories).map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input
                        type="file"
                        name="categoryImage"
                        onChange={handleCategoryImage}
                        style={{ margin: ".7rem 0px" }}
                        className="form-control"
                    />
                </Col>
            </Row>
        </Modals>
    );
};

export default AddCategoryModal;
