import React from "react";
import { useSelector } from "react-redux";

import createCategoryList from "../../../helpers/createCategory";
import Input from "../../../components/UI/Input";
import Modals from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const UpdateCategoryModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        size,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        onSubmit,
        handleCategoryImage,
    } = props;
    const category = useSelector((state) => state.category);

    return (
        <Modals
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modelTitle={modalTitle}
            size={size}
        >
            {/* For Expaned Item */}
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {expandedArray.length > 0 &&
                expandedArray.map((item, index) => (
                    <Row key={index} style={{ margin: ".4rem 0px" }}>
                        <Col>
                            <Input
                                className="form-control"
                                value={item.name}
                                placeholder={"Category Name"}
                                onChange={(e) =>
                                    handleCategoryInput("name", e.target.value, index, "expanded")
                                }
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) =>
                                    handleCategoryInput(
                                        "parentId",
                                        e.target.value,
                                        index,
                                        "expanded"
                                    )
                                }
                            >
                                <option>Select Category</option>

                                {createCategoryList(category.categories).map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </Col>

                        <Col>
                            <select
                                className="form-control"
                                value={item.type}
                                onChange={(e) =>
                                    handleCategoryInput("type", e.target.value, index, "expanded")
                                }
                            >
                                <option value=""> Select Type</option>
                                <option value="store"> Store</option>
                                <option value="product"> Product</option>
                                <option value="page"> Page</option>
                            </select>
                        </Col>
                    </Row>
                ))}

            {/* For Checked items */}
            <Row>
                <Col>
                    <h6>Checked</h6>
                </Col>
            </Row>
            {checkedArray.length > 0 &&
                checkedArray.map((item, index) => (
                    <Row key={index} style={{ margin: ".4rem 0px" }}>
                        <Col>
                            <Input
                                className="form-control"
                                value={item.name}
                                placeholder={"Category Name"}
                                onChange={(e) =>
                                    handleCategoryInput("name", e.target.value, index, "checked")
                                }
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) =>
                                    handleCategoryInput(
                                        "parentId",
                                        e.target.value,
                                        index,
                                        "checked"
                                    )
                                }
                            >
                                <option>Select Category</option>

                                {createCategoryList(category.categories).map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </Col>

                        <Col>
                            <select
                                className="form-control"
                                value={item.type}
                                onChange={(e) =>
                                    handleCategoryInput("type", e.target.value, index, "checked")
                                }
                            >
                                <option value=""> Select Type</option>
                                <option value="store"> Store</option>
                                <option value="product"> Product</option>
                                <option value="page"> Page</option>
                            </select>
                        </Col>
                    </Row>
                ))}
            <input
                type="file"
                className="form-control"
                name="categoryImage"
                onChange={handleCategoryImage}
            />
        </Modals>
    );
};

export default UpdateCategoryModal;
