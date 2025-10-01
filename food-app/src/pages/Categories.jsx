import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard.jsx';
import { recipes, categories } from '../data/recipes';

function Categories() {
  const { category } = useParams();

  const filteredRecipes = category
    ? recipes.filter(recipe => recipe.category === category)
    : [];

  return (
    <div className="categories-page">
      <h1>📚 Tarif Kategorileri</h1>

      {!category ? (
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <Link 
              key={index} 
              to={`/categories/${cat}`} 
              className="category-card"
            >
              <h3>{cat}</h3>
            </Link>
          ))}
        </div>
      ) : (
        <div className="category-recipes">
          <h2>{category} Tarifleri</h2>
          {filteredRecipes.length > 0 ? (
            <div className="recipes-grid">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
              Bu kategoride henüz tarif yok 😔
            </p>
          )}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link 
              to="/categories" 
              style={{
                padding: '0.8rem 2rem',
                background: '#667eea',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              ⬅️ Tüm Kategoriler
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
