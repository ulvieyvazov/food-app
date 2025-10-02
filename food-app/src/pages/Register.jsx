import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerSimple, getCurrentUser } from '../store/authStore.js';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');

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
    if (!form.username.trim() || !form.email.trim() || !form.password || !form.confirm) {
      setError('Tüm alanlar gereklidir');
      return;
    }
    if (form.username.trim().length < 3) {
      setError('Kullanıcı adı en az 3 karakter olmalıdır');
      return;
    }
    if (form.password.length < 5) {
      setError('Parola en az 5 karakter olmalıdır');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Geçerli bir e-posta giriniz');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Parolalar eşleşmiyor');
      return;
    }
    try {
      registerSimple(form.username.trim(), form.email.trim(), form.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Kayıt başarısız');
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
          Kayıt Ol
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
              id="register-username"
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
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>E-posta</label>
            <input
              name="email"
              type="email"
              id="register-email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Parola</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type={show1 ? 'text' : 'password'}
                id="register-password"
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
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShow1(s => !s)}
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
                {show1 ? 'Gizle' : 'Göster'}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Parola (Tekrar)</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type={show2 ? 'text' : 'password'}
                id="register-confirm"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                required
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShow2(s => !s)}
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
                {show2 ? 'Gizle' : 'Göster'}
              </button>
            </div>
          </div>

          {/* Doğrulama kodu kaldırıldı */}

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
              Kayıt Ol
            </button>
          </div>
        </form>
        

        <p style={{ marginTop: '1.2rem', textAlign: 'center', fontSize: '0.95rem' }}>
          Hesabın var mı?{' '}
          <Link to="/login" style={{ color: '#4f46e5', fontWeight: '600', textDecoration: 'none' }}>
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
