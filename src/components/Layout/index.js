import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";

import Header from "../Header";

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/page"}>Page</NavLink>
                </li>
                <li>
                  <NavLink to={"/category"}>category</NavLink>
                </li>
                <li>
                  <NavLink to={"/product"}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={"/order"}>Orders</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", marginTop: "60px" }}>
              {/* Other Part of called component */}
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children // childe where this is called
      )}
    </>
  );
};

export default Layout;
