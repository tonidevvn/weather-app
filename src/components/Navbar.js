import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ToogleModeColor from "./ToogleModeColor";
import { NavLink } from "react-router-dom";
import { NavItem, NavDropdown } from "react-bootstrap";

function MyNavbar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink to="/" end className="navbar-brand">
          Youtube-Search
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <NavDropdown
              title="Products…"
              id="basic-nav-dropdown"
              renderMenuOnMount={true}
            >
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
              <NavLink to="/addNewProduct" className="nav-link">
                New Product
              </NavLink>
            </NavDropdown>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
            <ToogleModeColor />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNavbar;
