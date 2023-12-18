// Menu.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../core/config';

const Menu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/1/categories.php`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.idCategory}>{category.strCategory}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
