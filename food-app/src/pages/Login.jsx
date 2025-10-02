import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, getCurrentUser } from '../store/authStore.js';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) navigate('/');
  }, [navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.username.trim() || !form.password) {
      setError('Kullanıcı adı ve parola gerekli');
      return;
    }
    try {
      login(form.username.trim(), form.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Giriş başarısız');
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        padding: '2rem'
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#111827'
        }}>
          Giriş Yap
        </h1>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#b91c1c',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '0.95rem',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Kullanıcı Adı</label>
            <input
              id="login-username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Parola</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type={show ? 'text' : 'password'}
                id="login-password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                style={{
                  background: '#6b7280',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                {show ? 'Gizle' : 'Göster'}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              style={{
                width: '100%',
                background: '#4f46e5',
                color: '#fff',
                padding: '0.85rem 1.25rem',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                border: 'none',
                transition: 'background 0.3s'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#4338ca'}
              onMouseOut={e => e.currentTarget.style.background = '#4f46e5'}
            >
              Giriş Yap
            </button>
          </div>
        </form>

        <p style={{ marginTop: '1.2rem', textAlign: 'center', fontSize: '0.95rem' }}>
          Hesabın yok mu?{' '}
          <Link to="/register" style={{ color: '#4f46e5', fontWeight: '600', textDecoration: 'none' }}>
            Kayıt ol
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
