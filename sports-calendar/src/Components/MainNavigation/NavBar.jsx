import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Style/navBar.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function Example(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand as={Link} to="/">
          Sports Calendar
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/Home">
                Home
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Log-out</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>account manager</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Admin options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={Link} to="/City">
                  Go to City
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/County">
                  Go To County
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/Location">
                  Go To Location
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/Review">
                  Go To Review
                </DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink tag={Link} to="/Event">Calendar</NavLink>
            </NavItem>
          </Nav>
          <Nav className="navbar-nav ml-auto disable-flex-grow" navbar>
            <NavItem>
              <NavLink className="nav-link" tag={Link} to="/">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" tag={Link} to="/">
                Sign Up
              </NavLink>
            </NavItem>
          </Nav>
  
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;
