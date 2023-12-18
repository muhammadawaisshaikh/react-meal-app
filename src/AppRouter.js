// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Menu from './pages/Menu';
import Meals from './pages/Meals';
import Favorites from './pages/Favorites';
import MealGenerator from './pages/MealGenerator';

export const routes = [
  { path: '/', name: 'Home', component: <Home /> },
  { path: '/about', name: 'About Me', component: <AboutMe /> },
  { path: '/menu', name: 'Menu', component: <Menu /> },
  { path: '/meals', name: 'Meals', component: <Meals /> },
  { path: '/favorites', name: 'My Favorites', component: <Favorites /> },
  { path: '/meal-generator', name: 'Meal Generator', component: <MealGenerator /> },
];

const AppRouter = () => {
  return (
    <Router>
      <Navbar />

      <div className='container'>
        <Routes>

          {
            routes.map((route) => {
              return (
                <Route path={route.path} exact element={route.component} />
              );
            })
          }
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;