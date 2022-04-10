import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modals from "../../components/UI/Modal";
import createCategoryList from "../../helpers/createCategory";

const NewPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setcategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setproducts] = useState([]);

  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    setcategories(createCategoryList(category.categories));
  }, [category]);

  useEffect(() => {
    if (!page.loading) {
      setCreateModal(false);
      setCategoryId("");
      setTitle("");
      setDescription("");
      setBanners([]);
      setproducts([]);
    }
  }, [page]);

  const handleBannersImage = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductImage = (e) => {
    setproducts([...products, e.target.files[0]]);
  };

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value === e.target.value
    );

    setCategoryId(e.target.value);
    setType(category.type);
  };

  const submitPageForm = (e) => {
    // if (title === "") {
    //   alert("Title is required");
    //   setCreateModal(false);
    //   return;
    // }

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("category", categoryId);
    form.append("type", type);

    banners.forEach((banner) => {
      form.append("banners", banner);
    });
    products.forEach((product) => {
      form.append("products", product);
    });

    dispatch(createPage(form));

    setCreateModal(false);
  };

  const renderCreatePageModel = () => {
    return (
      <Modals
        show={createModal}
        modelTitle={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
      >
        <Row>
          <Col>
            <Input
              type="select"
              value={categoryId}
              onChange={onCategoryChange}
              options={categories}
              placeholder={"Select Category"}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Input
              value={title}
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Page Title"}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Input
              value={description}
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Page Description"}
            />
          </Col>
        </Row>

        {banners.length > 0
          ? banners.map((banner, index) => (
              <Row key={index}>
                <Col>{banner.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <Input
              type="file"
              name="banners"
              className="form-control"
              onChange={handleBannersImage}
            />
          </Col>
        </Row>

        {products.length > 0
          ? products.map((product, index) => (
              <Row key={index}>
                <Col>{product.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <Input
              type="file"
              name="products"
              className="form-control"
              onChange={handleProductImage}
            />
          </Col>
        </Row>
      </Modals>
    );
  };
  return (
    <Layout sidebar>
      {page.loading ? (
        <> Loading..!!</>
      ) : (
        <>
          {renderCreatePageModel()}
          <button onClick={() => setCreateModal(true)}>Create Page</button>
        </>
      )}
    </Layout>
  );
};

export default NewPage;
