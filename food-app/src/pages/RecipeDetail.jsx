import React, { useMemo, useState, useRef } from 'react';
import SEO from '../components/SEO.jsx';
import { useParams, Link } from 'react-router-dom';
import { recipes as staticRecipes } from '../data/recipes';
import { getRecipeById, addComment, addReply, isFavorite, toggleFavorite, getAverageRating, getUserRating, setUserRating } from '../store/recipesStore.js';
import { getCurrentUser } from '../store/authStore.js';

function RecipeDetail() {
  const { id } = useParams();
  const [version, setVersion] = useState(0);
  const recipe = useMemo(() => getRecipeById(staticRecipes, id), [id, version]);
  const user = getCurrentUser();

  const [commentText, setCommentText] = useState('');
  const [message, setMessage] = useState('');
  const [replyOpenIndex, setReplyOpenIndex] = useState(null);
  const [replyText, setReplyText] = useState('');
  const commentsEndRef = useRef(null);
  const avg = useMemo(() => getAverageRating(recipe?.id), [recipe?.id, version]);
  const [myRating, setMyRating] = useState(() => (user ? getUserRating(user.username, id) : 0));
  const [fav, setFav] = useState(() => (user ? isFavorite(user.username, id) : false));

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

  function handleAddComment(e) {
    e.preventDefault();
    const text = commentText.trim();
    if (!text) return;
    if (!user) return;

    addComment(staticRecipes, recipe.id, { user: user.username, text });
    setCommentText('');
    setMessage('Yorum eklendi');
    setVersion(v => v + 1);
    setTimeout(() => {
      if (commentsEndRef.current) {
        commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  function handleToggleFavorite() {
    if (!user) return;
    const nowFav = toggleFavorite(user.username, id);
    setFav(nowFav);
  }

  function handleSetRating(v) {
    if (!user) return;
    setUserRating(user.username, id, v);
    setMyRating(v);
    setVersion(x => x + 1);
  }

  function handleAddReply(e, cIndex) {
    e.preventDefault();
    const text = replyText.trim();
    if (!text) return;
    if (!user) return;
    addReply(staticRecipes, recipe.id, cIndex, { user: user.username, text });
    setReplyText('');
    setReplyOpenIndex(null);
    setMessage('Cevap eklendi');
    setVersion(v => v + 1);
    setTimeout(() => {
      if (commentsEndRef.current) {
        commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  return (
    <div className="recipe-detail">
      <SEO 
        title={`${recipe.name} Tarifi | Yemek Tarifleri`}
        description={`${recipe.name} tarifi: ${recipe.ingredients.slice(0,3).join(', ')} ve adım adım hazırlanışı.`}
        canonical={`https://www.ornek-site.com/recipe/${recipe.id}`}
        ogImage={recipe.image}
        jsonLdId={`recipe-${recipe.id}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          name: recipe.name,
          image: recipe.image,
          recipeCategory: recipe.category,
          recipeIngredient: recipe.ingredients,
          recipeInstructions: recipe.instructions.map(i => ({ '@type': 'HowToStep', text: i })),
        }}
      />
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
            <span>⭐ {Math.round(avg.average*10)/10} ({avg.count})</span>
          </div>
          {user && (
            <div style={{ marginTop:'0.5rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
              <button onClick={handleToggleFavorite} className="btn" style={{ background: fav ? '#fca5a5' : '#e5e7eb', color: fav ? '#7f1d1d' : '#111827', padding:'0.45rem 0.75rem' }}>
                {fav ? '♥ Favoride' : '♡ Favorilere Ekle'}
              </button>
              <div>
                {Array.from({ length: 5 }).map((_, i) => {
                  const v = i + 1;
                  const active = myRating >= v;
                  return (
                    <button key={v} onClick={() => handleSetRating(v)} className="star-btn" style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:'1.2rem', color: active ? '#f59e0b' : '#d1d5db' }}>★</button>
                  );
                })}
              </div>
            </div>
          )}
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

              {/* Replies */}
              {Array.isArray(comment.replies) && comment.replies.length > 0 && (
                <div className="replies">
                  {comment.replies.map((r, i) => (
                    <div key={i} className="reply">
                      <p className="comment-user">↳ {r.user}</p>
                      <p>{r.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply action */}
              {user && (
                <div style={{ marginTop: '0.5rem' }}>
                  {replyOpenIndex === index ? (
                    <form onSubmit={(e) => handleAddReply(e, index)} style={{ display:'grid', gap:'0.5rem' }}>
                      <textarea id="reply-text" name="reply" value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={3} placeholder="Cevabınız..." />
                      <div style={{ display:'flex', gap:'0.5rem' }}>
                        <button type="submit" className="btn" style={{ background:'#10b981', color:'#fff', padding:'0.45rem 0.8rem' }}>Cevabı Gönder</button>
                        <button type="button" className="btn" style={{ background:'#e5e7eb', color:'#111827', padding:'0.45rem 0.8rem' }} onClick={() => { setReplyOpenIndex(null); setReplyText(''); }}>Vazgeç</button>
                      </div>
                    </form>
                  ) : (
                    <button className="btn" style={{ background:'#e0e7ff', color:'#4338ca', padding:'0.35rem 0.7rem' }} onClick={() => setReplyOpenIndex(index)}>Cevap Yaz</button>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={commentsEndRef} />

          {user ? (
            <div style={{ marginTop: '1rem' }}>
              {message && (
                <div style={{ background:'#ecfeff', color:'#0369a1', padding:'0.6rem 0.9rem', borderRadius:8, margin:'0 0 1rem' }}>{message}</div>
              )}
              <form onSubmit={handleAddComment} style={{ display:'grid', gap:'0.7rem' }}>
                <label>Yorum Yaz</label>
                <textarea id="comment-text" name="comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} rows={4} placeholder="Tarif ile ilgili düşünceleriniz..." />
                <div>
                  <button type="submit" className="btn" style={{ background:'#4f46e5', color:'#fff', padding:'0.6rem 1rem' }}>Yorumu Gönder</button>
                </div>
              </form>
            </div>
          ) : (
            <p style={{ marginTop: '1rem', color:'#6b7280' }}>Yorum yapmak için lütfen giriş yapın.</p>
          )}
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
