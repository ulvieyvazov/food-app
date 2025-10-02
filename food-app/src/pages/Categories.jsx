import React, { useMemo } from 'react';
import SEO from '../components/SEO.jsx';
import { Link, useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard.jsx';
import { recipes as staticRecipes } from '../data/recipes';
import { getAllRecipes } from '../store/recipesStore.js';

const TYPE_CATEGORIES = ["Çorbalar", "Ana Yemekler", "Tatlılar", "İçecekler"];
const COUNTRY_CATEGORIES = ["Azerbaycan", "Türkiye", "Yunanistan", "İtalya"];

function Categories() {
  const { category } = useParams();

  const allRecipes = useMemo(() => getAllRecipes(staticRecipes), []);

  const filteredRecipes = category
    ? allRecipes.filter(recipe => (
        COUNTRY_CATEGORIES.includes(category)
          ? recipe.countryCategory === category
          : recipe.category === category
      ))
    : [];

  if (category) {
    return (
      <div className="categories-page">
        <SEO 
          title={`${category} Yemek Tarifleri | Kategoriler`}
          description={`${category} kategorisindeki en yeni ve pratik yemek tarifleri.`}
          canonical={`https://www.ornek-site.com/categories/${category}`}
        />
        <h1>{category} Tarifleri</h1>
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
    );
  }

  return (
    <div className="categories-page">
      <SEO 
        title="Kategoriler | Yemek Tarifleri"
        description="Çorbalar, ana yemekler, tatlılar ve içecekler dahil tüm yemek kategorileri."
        canonical="https://www.ornek-site.com/categories"
      />
      <h1>📚 Kategoriler</h1>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
        <section>
          <h2 style={{ marginBottom: '1rem', color:'#4f46e5' }}>Yemek Türleri</h2>
          <div className="categories-grid">
            {TYPE_CATEGORIES.map((cat, index) => (
              <Link 
                key={index} 
                to={`/categories/${cat}`} 
                className="category-card"
              >
                <h3>{cat}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ marginBottom: '1rem', color:'#4f46e5' }}>Ülkeler</h2>
          <div className="categories-grid">
            {COUNTRY_CATEGORIES.map((cat, index) => (
              <Link 
                key={index} 
                to={`/categories/${cat}`} 
                className="category-card"
              >
                <h3>{cat}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Categories;
