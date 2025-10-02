import React, { useMemo, useState } from 'react';
import { listUsers } from '../../store/authStore.js';

function AdminUsers() {
  const [version, setVersion] = useState(0);
  const users = useMemo(() => listUsers(), [version]);

  return (
    <div>
      <h2>Kullanıcılar</h2>
      {users.length === 0 ? (
        <p>Henüz kayıtlı kullanıcı yok.</p>
      ) : (
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', background:'#fff', borderRadius:12, overflow:'hidden' }}>
            <thead style={{ background:'#f3f4f6' }}>
              <tr>
                <th style={{ textAlign:'left', padding:'12px', borderBottom:'1px solid #e5e7eb' }}>Kullanıcı Adı</th>
                <th style={{ textAlign:'left', padding:'12px', borderBottom:'1px solid #e5e7eb' }}>E-posta</th>
                <th style={{ textAlign:'left', padding:'12px', borderBottom:'1px solid #e5e7eb' }}>Doğrulandı</th>
                <th style={{ textAlign:'left', padding:'12px', borderBottom:'1px solid #e5e7eb' }}></th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.username}>
                  <td style={{ padding:'10px', borderBottom:'1px solid #f3f4f6', fontWeight:700, color:'#111827' }}>{u.username}</td>
                  <td style={{ padding:'10px', borderBottom:'1px solid #f3f4f6' }}>{u.email || '-'}</td>
                  <td style={{ padding:'10px', borderBottom:'1px solid #f3f4f6' }}>{u.verified ? 'Evet' : 'Hayır'}</td>
                  <td style={{ padding:'10px', borderBottom:'1px solid #f3f4f6' }}>
                    <button className="btn" style={{ background:'#ef4444', color:'#fff', padding:'0.4rem 0.7rem' }} onClick={() => {
                      const ok = window.confirm(`${u.username} kullanıcısını silmek istiyor musunuz?`);
                      if (!ok) return;
                      try {
                        const raw = localStorage.getItem('auth_users_v1');
                        const list = raw ? JSON.parse(raw) : [];
                        const filtered = list.filter(x => x.username !== u.username);
                        localStorage.setItem('auth_users_v1', JSON.stringify(filtered));
                        setVersion(v => v + 1);
                      } catch {}
                    }}>Sil</button>
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

export default AdminUsers;

