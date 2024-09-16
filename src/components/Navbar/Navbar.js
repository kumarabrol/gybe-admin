// src/components/Navbar/Navbar.js

import React from 'react';
import './Navbar.css'; 
const Navbar = ({ onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate('supervisor')}>GYBE</div>
      <ul className="navbar-menu">
        <li className="navbar-item" onClick={() => onNavigate('supervisor')}>Supervisor</li>
        <li className="navbar-item" onClick={() => onNavigate('tasks')}>Task Assignment</li>
      </ul>
    </nav>
  );
};

export default Navbar;


