import React from 'react';

interface CustomNavbarToggleProps {
  showNav: boolean;
  onClick: () => void;
  className?: string;
}

const CustomNavbarToggle: React.FC<CustomNavbarToggleProps> = ({
  showNav,
  onClick,
  className,
}) => {
  const toggleClassName = showNav ? 'open' : '';

  return (
    <button
      className={`nav-icon-toggle ${toggleClassName} ${className}`}
      onClick={onClick}
      aria-expanded={showNav}
    >
      <span />
      <span />
      <span />
      <span />
    </button>
  );
};

export default CustomNavbarToggle;
