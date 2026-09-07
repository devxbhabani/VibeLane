import React from 'react';

export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-brand">VibeLane</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  );
};
