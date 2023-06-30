import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import RegisterService from '../../Services/RegisterService';
import axios from 'axios';

function Example(props) {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // navigate and logout handle Logout link onClick event
  const navigate = useNavigate();

  const logout = () => {
    RegisterService.logoutUser()
      .then(response => console.log(response));
    localStorage.removeItem('token');
    props.setLoggedIn(false);
    navigate('/');
  }

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
              <NavLink tag={Link} to="/">
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
                <DropdownItem tag={Link} to="/Placement">
                  Placements
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/Sponsor">
                  Sponsors
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/EventPost">
                Event Post
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/Users">
                  Go To Users
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/EventSponsor">
                  Event Sponsor
                </DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="navbar-nav ml-auto disable-flex-grow" navbar>
            <NavItem>
              {props.loggedIn ? (
                <NavLink className="nav-link" tag={Link} to='/login' onClick={logout}>
                  Logout
                </NavLink>
              ) : (
                <NavLink className="nav-link" tag={Link} to="/login">
                  Login
                </NavLink>
              )}
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" tag={Link} to="/register">
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