const USERS_KEY = 'auth_users_v1';
const SESSION_KEY = 'auth_session_v1';
const CODES_KEY = 'auth_codes_v1';
const PENDING_KEY = 'auth_pending_v1';

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  notify();
}

let listeners = [];
function notify() {
  const user = getCurrentUser();
  listeners.forEach(l => l(user));
}

export function subscribeAuth(listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

export function getCurrentUser() {
  return readSession();
}

export function listUsers() {
  const users = readUsers();
  return users.map(u => ({ username: u.username, email: u.email, verified: !!u.verified }));
}

// Email verification helpers
function readCodes() {
  try {
    const raw = localStorage.getItem(CODES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeCodes(map) {
  localStorage.setItem(CODES_KEY, JSON.stringify(map));
}

function readPending() {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writePending(map) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(map));
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function beginRegistration(username, email, password) {
  username = (username || '').trim();
  email = (email || '').trim().toLowerCase();
  if (!username || !email || !password) {
    throw new Error('Tüm alanlar gereklidir');
  }
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    throw new Error('Bu kullanıcı adı zaten kayıtlı');
  }
  if (users.find(u => (u.email || '').toLowerCase() === email)) {
    throw new Error('Bu e-posta zaten kayıtlı');
  }
  const pending = readPending();
  pending[email] = { username, email, password };
  writePending(pending);

  const codes = readCodes();
  const code = generateCode();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  codes[email] = { code, expiresAt };
  writeCodes(codes);

  // Try to send email via backend if available
  try {
    fetch('/api/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, code })
    }).catch(() => {});
  } catch {}

  // For demo we still return code to ease testing; set to null to hide
  return { sent: true, code };
}

export function confirmRegistration(email, code) {
  email = (email || '').trim().toLowerCase();
  code = String(code || '').trim();
  const pending = readPending();
  const item = pending[email];
  if (!item) {
    throw new Error('Doğrulanacak kayıt bulunamadı');
  }
  const codes = readCodes();
  const c = codes[email];
  if (!c) {
    throw new Error('Doğrulama kodu bulunamadı');
  }
  if (Date.now() > (c.expiresAt || 0)) {
    throw new Error('Doğrulama kodunun süresi doldu');
  }
  if (c.code !== code) {
    throw new Error('Doğrulama kodu hatalı');
  }

  // Persist user
  const users = readUsers();
  users.push({ username: item.username, email: item.email, password: item.password, verified: true });
  writeUsers(users);

  // Cleanup
  delete pending[email];
  writePending(pending);
  delete codes[email];
  writeCodes(codes);

  writeSession({ username: item.username });
  return { username: item.username };
}

export function login(username, password) {
  const users = readUsers();
  const found = users.find(u => u.username === username && u.password === password);
  if (!found) {
    throw new Error('Kullanıcı adı veya parola hatalı');
  }
  // Email code flow disabled by request; all new users are verified at registration time
  writeSession({ username: found.username });
  return { username: found.username };
}

// Simple registration without email code, with basic validation
export function registerSimple(username, email, password) {
  username = (username || '').trim();
  email = (email || '').trim().toLowerCase();
  if (username.length < 3) {
    throw new Error('Kullanıcı adı en az 3 karakter olmalıdır');
  }
  if (password == null || String(password).length < 5) {
    throw new Error('Parola en az 5 karakter olmalıdır');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Geçerli bir e-posta giriniz');
  }
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    throw new Error('Bu kullanıcı adı zaten kayıtlı');
  }
  if (users.find(u => (u.email || '').toLowerCase() === email)) {
    throw new Error('Bu e-posta zaten kayıtlı');
  }
  users.push({ username, email, password, verified: true });
  writeUsers(users);
  writeSession({ username });
  notify();
  return { username };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  notify();
}
