import React from 'react';
import { Navbar } from 'react-bootstrap';
import '../styles/Animations.css'; // Import the animation styles

interface CustomNavbarToggleProps {
  showNav: boolean;
  onClick: () => void;
}

const CustomNavbarToggle: React.FC<CustomNavbarToggleProps> = ({
  showNav,
  onClick,
}) => {
  return (
    <div
      className={`nav-icon3 ${showNav ? 'open' : ''}`}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
      <span />
    </div>
  );
};

export default CustomNavbarToggle;
