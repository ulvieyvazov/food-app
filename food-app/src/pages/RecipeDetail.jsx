import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { recipes } from '../data/recipes';

function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Tarif bulunamadı 😔</h2>
        <Link 
          to="/" 
          style={{
            padding: '0.8rem 2rem',
            background: '#667eea',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '1rem'
          }}
        >
          Anasayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <img 
        src={recipe.image} 
        alt={recipe.name}
        className="recipe-detail-image"
      />
      
      <div className="recipe-detail-content">
        <div className="recipe-detail-header">
          <h1>{recipe.name}</h1>
          <p style={{ color: '#667eea', fontSize: '1.2rem' }}>
            {recipe.category}
          </p>
          <div className="recipe-detail-meta">
            <span>⏱️ Hazırlık Süresi: {recipe.time}</span>
            <span>🍽️ Porsiyon: {recipe.servings} kişilik</span>
          </div>
        </div>

        <div className="recipe-detail-section">
          <h2>🛒 Malzemeler</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-detail-section">
          <h2>👨‍🍳 Hazırlanışı</h2>
          <ol className="instructions-list">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="comments-section">
          <h2>💬 Kullanıcı Yorumları ({recipe.comments.length})</h2>
          {recipe.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p className="comment-user">👤 {comment.user}</p>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link 
            to="/" 
            style={{
              padding: '0.8rem 2rem',
              background: '#667eea',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            ⬅️ Anasayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
