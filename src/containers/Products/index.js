import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import Modals from "../../components/UI/Modal";
import "./style.css";
import { addProduct } from "../../actions";
import { generatePublicUrl } from "../../APIs/urlConfig";
import { IoAddCircleOutline } from "react-icons/io5";

const Products = (props) => {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [productDetailModel, setProductDetailModel] = useState(false);

  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleShow = () => setShow(true);

  const handleAddProduct = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("price", price);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductImage = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProductsInTable = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product, index) => (
                <tr
                  key={product._id}
                  onClick={() => showProductDetailModel(product)}
                >
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const showProductDetailModel = (product) => {
    setProductDetails(product);
    setProductDetailModel(true);
  };
  const renderShowProductDetailModel = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <Modals
        show={productDetailModel}
        handleClose={() => setProductDetailModel(false)}
        modelTitle={"Product details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col className="key" style={{ diisplay: "flex" }}>
            <label className="key">Pictures</label>
            <div className="value productImgContainer">
              {productDetails.productPictures.map((picture) => (
                <img src={generatePublicUrl(picture.img)} alt="Img" />
              ))}
            </div>
          </Col>
        </Row>
      </Modals>
    );
  };
  const renderProductModel = () => {
    return (
      <Modals
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleAddProduct}
        modelTitle={"Add New Product"}
      >
        <label>Enter Following details:</label>

        <Input
          label="Name"
          value={name}
          placeholder={"Product Name"}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={"Quantity"}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={"Price"}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={"Description"}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{ margin: ".4rem 0px" }}
        >
          <option>Select Category</option>

          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="categoryPicture"
          onChange={handleProductImage}
        />
      </Modals>
    );
  };
  return (
    <div>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div className="topContainer">
                <h3>Products</h3>
                <div className="actionBtnContainer">
                  <span>Actions: </span>

                  <button onClick={handleShow}>
                    <IoAddCircleOutline /> <span> Add </span>
                  </button>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>{renderProductsInTable()}</Col>
          </Row>

          {/* For popup menu */}
          {renderProductModel()}
          {renderShowProductDetailModel()}
        </Container>
      </Layout>
    </div>
  );
};

export default Products;
