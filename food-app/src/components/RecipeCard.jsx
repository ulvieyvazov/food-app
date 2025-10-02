import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAverageRating } from '../store/recipesStore.js';

function RecipeCard({ recipe }) {
  const rating = useMemo(() => getAverageRating(recipe.id), [recipe.id]);
  const rounded = Math.round(rating.average * 10) / 10;

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <img 
        src={recipe.image} 
        alt={recipe.name} 
        className="recipe-card-image"
      />
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.name}</h3>
        <p className="recipe-card-category">{recipe.category}</p>
        <div className="recipe-card-info">
          <span>⏱️ {recipe.time}</span>
          <span>⭐ {rounded || 0} ({rating.count})</span>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
