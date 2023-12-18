import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            About Me
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu">
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites">
            My Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to="/meal-generator">
            Meal Generator
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;