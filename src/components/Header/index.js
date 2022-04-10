import { Navbar, Nav, Container } from "react-bootstrap";

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../actions";

function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const renderNotLoggedInLikns = () => {
    const logout = () => {
      dispatch(signout());
    };

    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            Signout
          </span>
        </li>
      </Nav>
    );
  };

  const renderLoggedInLikns = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signin">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluied="true">
        <Link to="/" className="navbar-brand">
          Admin Deshboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          {auth.authenticate ? renderNotLoggedInLikns() : renderLoggedInLikns()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
