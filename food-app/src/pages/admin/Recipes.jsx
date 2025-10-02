import React, { useMemo, useState } from 'react';
import { recipes as staticRecipes } from '../../data/recipes';
import { getAllRecipes, deleteRecipe, updateRecipe } from '../../store/recipesStore.js';

const TYPE_CATEGORIES = ["Çorbalar", "Ana Yemekler", "Tatlılar", "İçecekler"];
const COUNTRY_CATEGORIES = ["Azerbaycan", "Türkiye", "Yunanistan", "İtalya"];

function AdminRecipes() {
  const [version, setVersion] = useState(0);
  const all = useMemo(() => getAllRecipes(staticRecipes), [version]);

  const [group, setGroup] = useState('type'); // 'type' | 'country'
  const [selectedCat, setSelectedCat] = useState('');

  const visible = useMemo(() => {
    if (!selectedCat) return all;
    if (group === 'country') {
      return all.filter(r => r.countryCategory === selectedCat);
    }
    return all.filter(r => r.category === selectedCat);
  }, [all, selectedCat, group]);

  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ name:'', category:'', image:'', time:'', servings:1 });
  const [message, setMessage] = useState('');

  function refresh() {
    setVersion(v => v + 1);
  }

  function handleDelete(id) {
    deleteRecipe(staticRecipes, id);
    setMessage('Tarif silindi');
    refresh();
  }

  function startEdit(recipe) {
    setEditing(recipe.id);
    setEditForm({
      name: recipe.name || '',
      category: recipe.category || '',
      image: recipe.image || '',
      time: recipe.time || '',
      servings: recipe.servings || 1
    });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: name === 'servings' ? Number(value) : value }));
  }

  function submitEdit(e) {
    e.preventDefault();
    updateRecipe(staticRecipes, { id: editing, ...editForm });
    setMessage('Tarif güncellendi');
    setEditing(null);
    refresh();
  }

  const currentCats = group === 'type' ? TYPE_CATEGORIES : COUNTRY_CATEGORIES;

  return (
    <div>
      <h2>Tarifler</h2>
      {message && (
        <div style={{ background:'#ecfeff', color:'#0369a1', padding:'0.6rem 0.9rem', borderRadius:8, margin:'0 0 1rem' }}>{message}</div>
      )}

      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem', flexWrap:'wrap' }}>
        <div style={{ display:'inline-flex', background:'#eef2ff', borderRadius:999, padding:4 }}>
          <button onClick={() => { setGroup('type'); setSelectedCat(''); }} className="btn" style={{ background: group==='type' ? '#4f46e5' : 'transparent', color: group==='type' ? '#fff' : '#111827', padding:'0.4rem 0.9rem' }}>Yemek Türleri</button>
          <button onClick={() => { setGroup('country'); setSelectedCat(''); }} className="btn" style={{ background: group==='country' ? '#4f46e5' : 'transparent', color: group==='country' ? '#fff' : '#111827', padding:'0.4rem 0.9rem' }}>Ülkeler</button>
        </div>
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
          {currentCats.map(cat => (
            <button key={cat} onClick={() => setSelectedCat(prev => prev === cat ? '' : cat)} className="btn" style={{ background: selectedCat===cat ? '#111827' : '#e5e7eb', color: selectedCat===cat ? '#fff' : '#111827', padding:'0.35rem 0.8rem' }}>{cat}</button>
          ))}
          {selectedCat && (
            <button onClick={() => setSelectedCat('')} className="btn" style={{ background:'#ef4444', color:'#fff', padding:'0.35rem 0.8rem' }}>Filtreyi Temizle</button>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <p>Tarif bulunamadı.</p>
      ) : (
        <div className="recipes-grid">
          {visible.map(r => (
            <div key={r.id} className="recipe-card" style={{ position:'relative' }}>
              <img src={r.image} alt={r.name} className="recipe-card-image" />
              <div className="recipe-card-content">
                <h3 className="recipe-card-title">{r.name}</h3>
                <p className="recipe-card-category">{r.category}{r.countryCategory ? ` • ${r.countryCategory}` : ''}</p>
                <div className="recipe-card-info">
                  <span>{r.time || '—'}</span>
                  <span>{r.servings ? `${r.servings} kişilik` : '—'}</span>
                </div>
                <div style={{ display:'flex', gap:'0.5rem', marginTop:'0.8rem' }}>
                  <button className="btn" onClick={() => startEdit(r)} style={{ background:'#111827', color:'#fff', padding:'0.45rem 0.8rem' }}>Düzenle</button>
                  <button className="btn" onClick={() => handleDelete(r.id)} style={{ background:'#ef4444', color:'#fff', padding:'0.45rem 0.8rem' }}>Sil</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing != null && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div className="about-page" style={{ maxWidth: 640 }}>
            <h3>Tarifi Düzenle</h3>
            <form onSubmit={submitEdit} style={{ display:'grid', gap:'0.9rem', marginTop:'0.8rem' }}>
              <div>
                <label>Ad</label>
                <input name="name" value={editForm.name} onChange={handleEditChange} />
              </div>
              <div>
                <label>Kategori</label>
                <input name="category" value={editForm.category} onChange={handleEditChange} />
              </div>
              <div>
                <label>Görsel URL</label>
                <input name="image" value={editForm.image} onChange={handleEditChange} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem' }}>
                <div>
                  <label>Süre</label>
                  <input name="time" value={editForm.time} onChange={handleEditChange} />
                </div>
                <div>
                  <label>Porsiyon</label>
                  <input type="number" name="servings" min={1} value={editForm.servings} onChange={handleEditChange} />
                </div>
              </div>
              <div style={{ display:'flex', gap:'0.6rem' }}>
                <button type="button" className="btn" onClick={() => setEditing(null)} style={{ background:'#6b7280', color:'#fff', padding:'0.6rem 1rem' }}>Vazgeç</button>
                <button type="submit" className="btn" style={{ background:'#4f46e5', color:'#fff', padding:'0.6rem 1rem' }}>Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRecipes;
