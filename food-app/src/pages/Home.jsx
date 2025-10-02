import React, { useMemo, useState } from 'react';
import RecipeCard from '../components/RecipeCard.jsx';
import { recipes as staticRecipes } from '../data/recipes';
import { getAllRecipes } from '../store/recipesStore.js';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const allRecipes = useMemo(() => getAllRecipes(staticRecipes), []);

  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>🍳 Lezzet Durağı'na Hoş Geldiniz!</h1>
        <p>En sevdiğiniz tarifleri keşfedin ve mutfağınızı şenlendirin</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Tarif ara... (örn: mercimek, mantı)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <section className="recipes-section">
        <h2>
          {searchTerm ? `"${searchTerm}" için sonuçlar` : '⭐ Popüler Tarifler'}
        </h2>
        {filteredRecipes.length > 0 ? (
          <div className="recipes-grid">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
            Aradığınız tarif bulunamadı 😔
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;
