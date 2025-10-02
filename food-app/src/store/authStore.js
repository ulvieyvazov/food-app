const USERS_KEY = 'auth_users_v1';
const SESSION_KEY = 'auth_session_v1';

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
  return users.map(u => ({ username: u.username }));
}

export function register(username, password) {
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    throw new Error('Bu kullanıcı adı zaten kayıtlı');
  }
  const newUser = { username, password };
  users.push(newUser);
  writeUsers(users);
  writeSession({ username });
  return { username };
}

export function login(username, password) {
  const users = readUsers();
  const found = users.find(u => u.username === username && u.password === password);
  if (!found) {
    throw new Error('Kullanıcı adı veya parola hatalı');
  }
  writeSession({ username: found.username });
  return { username: found.username };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  notify();
}
