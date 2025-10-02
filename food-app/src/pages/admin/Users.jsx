import React, { useMemo } from 'react';
import { listUsers } from '../../store/authStore.js';

function AdminUsers() {
  const users = useMemo(() => listUsers(), []);

  return (
    <div>
      <h2>Kullanıcılar</h2>
      {users.length === 0 ? (
        <p>Henüz kayıtlı kullanıcı yok.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map(u => (
            <li key={u.username} style={{ background:'#f3f4f6', margin:'8px 0', padding:'12px', borderRadius:10 }}>
              {u.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminUsers;

