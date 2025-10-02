import React, { useMemo, useState } from 'react';
import { recipes as staticRecipes } from '../../data/recipes';
import { getAllRecipes, deleteComment } from '../../store/recipesStore.js';

function AdminComments() {
  const [version, setVersion] = useState(0);
  const comments = useMemo(() => {
    const all = getAllRecipes(staticRecipes);
    const list = [];
    all.forEach(r => {
      if (Array.isArray(r.comments)) {
        r.comments.forEach((c, idx) => {
          list.push({ recipeId: r.id, recipeName: r.name, commentIndex: idx, ...c });
        });
      }
    });
    return list;
  }, [version]);

  function handleDelete(recipeId, commentIndex) {
    const ok = window.confirm('Bu yorumu silmek istediğinize emin misiniz?');
    if (!ok) return;
    deleteComment(staticRecipes, recipeId, commentIndex);
    setVersion(v => v + 1);
  }

  return (
    <div>
      <h2>Yorumlar</h2>
      {comments.length === 0 ? (
        <p>Yorum bulunmuyor.</p>
      ) : (
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', background:'#fff', borderRadius:12, overflow:'hidden' }}>
            <thead style={{ background:'#f3f4f6' }}>
              <tr>
                <th style={{ textAlign:'left', padding:'12px', borderBottom:'1px solid #e5e7eb' }}>Kullanıcı</th>
                <th style={{ textAlign:'left', padding:'12px', borderBottom:'1px solid #e5e7eb' }}>Yorum</th>
                <th style={{ textAlign:'left', padding:'12px', borderBottom:'1px solid #e5e7eb' }}>Tarif</th>
                <th style={{ textAlign:'left', padding:'12px', borderBottom:'1px solid #e5e7eb' }}></th>
              </tr>
            </thead>
            <tbody>
              {comments.map((c, i) => (
                <tr key={i}>
                  <td style={{ padding:'10px', borderBottom:'1px solid #f3f4f6', fontWeight:600, color:'#4f46e5' }}>{c.user || 'Anonim'}</td>
                  <td style={{ padding:'10px', borderBottom:'1px solid #f3f4f6' }}>{c.text}</td>
                  <td style={{ padding:'10px', borderBottom:'1px solid #f3f4f6' }}>{c.recipeName} (#{c.recipeId})</td>
                  <td style={{ padding:'10px', borderBottom:'1px solid #f3f4f6' }}>
                    <button className="btn" style={{ background:'#ef4444', color:'#fff', padding:'0.4rem 0.7rem' }} onClick={() => handleDelete(c.recipeId, c.commentIndex)}>Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminComments;

