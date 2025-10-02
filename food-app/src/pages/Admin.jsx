import React, { useMemo, useState } from 'react';
import { addRecipe, getAllCategories } from '../store/recipesStore.js';
import { recipes as staticRecipes, categories as staticCategories } from '../data/recipes';
import { useNavigate, Link, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminUsers from './admin/Users.jsx';
import AdminRecipes from './admin/Recipes.jsx';
import AdminComments from './admin/Comments.jsx';

const SESSION_KEY = 'admin_logged_in_v1';
const TYPE_CATEGORIES = ["Çorbalar", "Ana Yemekler", "Tatlılar", "İçecekler"];
const COUNTRY_CATEGORIES = ["Azerbaycan", "Türkiye", "Yunanistan", "İtalya"];

function Admin() {
  const categories = useMemo(() => getAllCategories(staticRecipes, staticCategories), []);
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');
  const [login, setLogin] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [form, setForm] = useState({
    name: '',
    categoryType: TYPE_CATEGORIES[0] || '',
    countryCategory: COUNTRY_CATEGORIES[0] || '',
    image: '',
    time: '',
    servings: 1,
    ingredientsText: '',
    instructionsText: ''
  });
  const [message, setMessage] = useState('');

  function handleLoginChange(e) {
    const { name, value } = e.target;
    setLogin(prev => ({ ...prev, [name]: value }));
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (login.username === 'ulvi' && login.password === '12345') {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthed(true);
      setLoginError('');
      if (location.pathname === '/admin') {
        navigate('/admin');
      }
    } else {
      setLoginError('Kullanıcı adı veya parola hatalı');
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
    setLogin({ username: '', password: '' });
    navigate('/');
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'servings' ? Number(value) : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const ingredients = form.ingredientsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);
    const instructions = form.instructionsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const created = addRecipe(staticRecipes, {
      name: form.name.trim(),
      // keep main category as type for compatibility with lists
      category: form.categoryType.trim(),
      countryCategory: form.countryCategory.trim(),
      image: form.image.trim(),
      time: form.time.trim(),
      servings: form.servings || 1,
      ingredients,
      instructions
    });

    setMessage(`Tarif eklendi: ${created.name} (id: ${created.id})`);
    setForm(prev => ({
      ...prev,
      name: '',
      image: '',
      time: '',
      servings: 1,
      ingredientsText: '',
      instructionsText: ''
    }));
  }

  if (!isAuthed) {
    return (
      <div className="admin-page" style={{ maxWidth: '420px', margin: '0 auto' }}>
        <h1>🔐 Admin Girişi</h1>
        {loginError && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1rem' }}>
            {loginError}
          </div>
        )}
        <form onSubmit={handleLoginSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label>Kullanıcı Adı</label>
            <input name="username" value={login.username} onChange={handleLoginChange} placeholder="ulvi" />
          </div>
          <div>
            <label>Parola</label>
            <input type="password" name="password" value={login.password} onChange={handleLoginChange} placeholder="12345" />
          </div>
          <div>
            <button type="submit" className="btn" style={{ background: '#111827', color: 'white', padding: '0.75rem 1.25rem', borderRadius: 8 }}>
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'240px 1fr', gap:'1.5rem' }}>
      <aside style={{ background:'#0f172a', color:'#fff', borderRadius:12, padding:'1rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
          <strong>Yönetim</strong>
          <button onClick={handleLogout} className="btn" style={{ background:'#ef4444', color:'#fff', padding:'0.4rem 0.7rem' }}>Çıkış</button>
        </div>
        <nav style={{ display:'grid', gap:'0.5rem' }}>
          <Link to="/admin" style={{ color:'#fff', textDecoration:'none', opacity: location.pathname === '/admin' ? 1 : 0.85 }}>+ Yeni Tarif</Link>
          <Link to="/admin/users" style={{ color:'#fff', textDecoration:'none', opacity: location.pathname.startsWith('/admin/users') ? 1 : 0.85 }}>Kullanıcılar</Link>
          <Link to="/admin/recipes" style={{ color:'#fff', textDecoration:'none', opacity: location.pathname.startsWith('/admin/recipes') ? 1 : 0.85 }}>Tarifler</Link>
          <Link to="/admin/comments" style={{ color:'#fff', textDecoration:'none', opacity: location.pathname.startsWith('/admin/comments') ? 1 : 0.85 }}>Yorumlar</Link>
        </nav>
      </aside>

      <section className="admin-page" style={{ margin: 0 }}>
        <Routes>
          <Route index element={
            <div>
              <h1>🛠️ Admin - Yeni Tarif Ekle</h1>
              {message && (
                <div style={{ background: '#e6fffa', color: '#047857', padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1rem' }}>
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="admin-form" style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label>Tarif Adı</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Örn: İzmir Köfte" />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  <div>
                    <label>Kategori 1 (Yemek Türü)</label>
                    <select name="categoryType" value={form.categoryType} onChange={handleChange}>
                      {TYPE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Kategori 2 (Ülke)</label>
                    <select name="countryCategory" value={form.countryCategory} onChange={handleChange}>
                      {COUNTRY_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label>Görsel URL</label>
                  <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label>Hazırlama Süresi</label>
                    <input name="time" value={form.time} onChange={handleChange} placeholder="30 dk" />
                  </div>
                  <div>
                    <label>Porsiyon</label>
                    <input type="number" min={1} name="servings" value={form.servings} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label>Malzemeler (her satır bir madde)</label>
                  <textarea name="ingredientsText" rows={6} value={form.ingredientsText} onChange={handleChange} placeholder={'1 su bardağı un\n2 adet yumurta'} />
                </div>
                <div>
                  <label>Adımlar (her satır bir adım)</label>
                  <textarea name="instructionsText" rows={6} value={form.instructionsText} onChange={handleChange} placeholder={'Unu ve yumurtayı yoğur\nDinlendir ve şekil ver'} />
                </div>
                <div>
                  <button type="submit" className="btn" style={{ background: '#667eea', color: 'white', padding: '0.75rem 1.25rem', borderRadius: 8 }}>
                    Ekle
                  </button>
                </div>
              </form>
            </div>
          } />
          <Route path="users" element={<AdminUsers />} />
          <Route path="recipes" element={<AdminRecipes />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </section>
    </div>
  );
}

export default Admin;
