import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../core/config';
import { useDispatch } from 'react-redux';
import { addToFavourites } from '../state/slices/favouriteSlice';

const MealGenerator = () => {
  const [meal, setMeal] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRandomMeal = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/1/random.php`);
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching random meal:', error);
      }
    };

    fetchRandomMeal();
  }, []);

  const handleFavorite = () => {
    console.log('Meal marked as favorite:', meal);
    dispatch(addToFavourites(meal));
  };

  return (
    <div>
      <h1 className='text-center'>Random Meal Generator</h1>

      {meal && (
        <div class="card mt-5">
          <div class="row g-0">
            <div class="col-md-4">
              <img src={meal.strMealThumb} alt={meal.strMeal} class="img-fluid rounded-start" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
              <h5 class="card-title">{meal.strMeal}</h5>
                <p class="card-text">{meal.strInstructions}</p>
                <a onClick={handleFavorite} class="btn btn-primary">Mark as Favorite</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealGenerator;
