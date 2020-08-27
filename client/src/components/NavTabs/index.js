import React, {useState} from "react";
import { useStoreContext } from "../../utils/GlobalStore"
import API from "../../utils/API";
import { AUTH_SET_LOGGED_OUT } from "../../utils/actions";
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function NavTab () {
    // const [isOpen, setIsOpen] = useState(false);
  
    // const toggle = () => setIsOpen(!isOpen);
    const [state, dispatch] = useStoreContext();
    const { username } = state;

    const logout = () => {
      API.logout().then(() => {
          dispatch({
              type: AUTH_SET_LOGGED_OUT
          })
      })
  }

  const [isOpen, setIsOpen] = useState(false);      
  const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
          <Navbar color="dark" dark expand="lg" fixex="top">
            <NavbarBrand href="/">Movie Librarian</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
      {/* since we have the path setting on App.js we don't need href but I put them on just in case for now. */}
                  <NavLink  href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  href="/library">Library</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  href="/wishlist">Wishlist</NavLink>
                </NavItem>
              </Nav>
              <NavbarText> Hi, {username}</NavbarText> 
                  <NavLink className="float-right" onClick={() => logout() } href="/logout">Log out</NavLink>
            </Collapse>
          </Navbar>
        </div>
      );


}
export default NavTab;