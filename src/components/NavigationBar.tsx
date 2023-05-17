import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import '../styles/App.css';
import '../styles/Animations.css';

const NavigationBar = () => {
  return (
    <Navbar bg="black" expand="lg">
      <Navbar.Brand style={{marginLeft:10 + 'px'}}>
        <Nav.Link as={Link} to="/">
        Password Generator 
        <FontAwesomeIcon id="lock" className="lock-image" icon={faLock} style={{color: "#0d6efd", marginLeft:5 + 'px'}} />
        </Nav.Link>       
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className="left-spacing" as={Link} to="/PasswordGenerator">
            Password Generator
          </Nav.Link>
          <Nav.Link className="left-spacing" as={Link} to="/password-tips">
            Password Tips
          </Nav.Link>         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
