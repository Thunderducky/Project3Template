import React from "react";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const NavTab = (props) => {
    // const [isOpen, setIsOpen] = useState(false);
  
    // const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
    
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Movie Librariran</NavbarBrand>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/Home/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/library">library</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/wishlist/">Wishlist</NavLink>
                </NavItem>
                  <NavbarText> Hi, {props.username}</NavbarText> 
              </Nav>
              <NavItem>
                  <NavLink href="/">Log-out</NavLink>
              </NavItem>
          </Navbar>
        </div>
      );


}
export default NavTab;