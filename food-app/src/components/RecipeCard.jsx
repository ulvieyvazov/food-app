import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
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
          <span>🍽️ {recipe.servings} kişilik</span>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
