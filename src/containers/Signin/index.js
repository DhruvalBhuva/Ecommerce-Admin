import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Home from "../Home";

const Signin = (props) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  
  const userLogin = (e) => {
    e.preventDefault();
    
    const user = {
      email,
      password,
    };
    dispatch(login(user));
    
  };
  //After login navigate to home page
  if (auth.authenticate) {
    navigate('/')
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "5rem" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                style={{ marginTop: "0.8rem" }}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>{" "}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
