import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../AppRouter';

const Navbar = () => {
  return (
    <nav>
      <ul>
        {
          routes.map((route) => {
            return (
              <li>
                <NavLink to={route.path} exact activeClassName="active">
                  {route.name}
                </NavLink>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
};

export default Navbar;