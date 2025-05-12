import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
      <nav className="navBar">
        <div className="logo">
          <h2>PassMaster</h2>
        </div>
        <div className="navLinks">
          <div><a href="#">Home</a></div>
          <div><a href="#">About</a></div>
          <div><a href="#">Contact</a></div>
        </div>
      </nav>
  );
};

export default Navbar;