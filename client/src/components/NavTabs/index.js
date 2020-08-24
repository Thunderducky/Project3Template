import React from "react";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const NavTab = (props) => {
    // const [isOpen, setIsOpen] = useState(false);
  
    // const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
    
          <Navbar color="dark" dark expand="lg" fixex="top">
            <NavbarBrand href="/">Movie Librariran</NavbarBrand>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/Home">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/library">library</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/wishlist/">Wishlist</NavLink>
                </NavItem>
              </Nav>
              <NavbarText> Hi, {props.username}</NavbarText> 
                  <NavLink className="float-right" href="/">Log-out</NavLink>

          </Navbar>
        </div>
      );


}
export default NavTab;