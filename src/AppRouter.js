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

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/menu" exact element={<Menu />} />
        <Route path="/menu/:category" element={<Meals />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/meal-generator" element={<MealGenerator />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;