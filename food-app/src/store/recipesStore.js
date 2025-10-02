const STORAGE_KEY = 'recipes_store_v1';
const DELETED_KEY = 'recipes_deleted_v1';
const OVERRIDES_KEY = 'recipes_overrides_v1';

function loadStoredRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveStoredRecipes(recipes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch {
    // ignore quota or serialization errors
  }
}

function loadDeletedIds() {
  try {
    const raw = localStorage.getItem(DELETED_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function saveDeletedIds(ids) {
  localStorage.setItem(DELETED_KEY, JSON.stringify(ids));
}

function loadOverrides() {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    if (!raw) return {};
    const map = JSON.parse(raw);
    return map && typeof map === 'object' ? map : {};
  } catch {
    return {};
  }
}

function saveOverrides(overrides) {
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
}

function getNextId(staticRecipes, storedRecipes) {
  const all = [...staticRecipes, ...storedRecipes];
  const maxId = all.reduce((max, r) => (typeof r.id === 'number' && r.id > max ? r.id : max), 0);
  return maxId + 1;
}

function applyDeleted(recipes) {
  const deleted = new Set(loadDeletedIds().map(String));
  return recipes.filter(r => !deleted.has(String(r.id)));
}

function applyOverrides(recipes) {
  const overrides = loadOverrides();
  return recipes.map(r => {
    const ov = overrides[String(r.id)];
    return ov ? { ...r, ...ov, id: r.id } : r;
  });
}

export function getAllRecipes(staticRecipes) {
  const stored = loadStoredRecipes();
  const combined = [...staticRecipes, ...stored];
  const noDeleted = applyDeleted(combined);
  return applyOverrides(noDeleted).map(r => ({
    ...r,
    comments: Array.isArray(r.comments)
      ? r.comments.map(c => ({ ...c, replies: Array.isArray(c.replies) ? c.replies : [] }))
      : []
  }));
}

export function getRecipeById(staticRecipes, id) {
  const all = getAllRecipes(staticRecipes);
  return all.find(r => String(r.id) === String(id));
}

export function getAllCategories(staticRecipes, staticCategories) {
  const all = getAllRecipes(staticRecipes);
  const dynamicCats = Array.from(new Set(all.map(r => r.category).filter(Boolean)));
  const base = Array.isArray(staticCategories) ? staticCategories : [];
  const merged = Array.from(new Set([...base, ...dynamicCats]));
  return merged;
}

export function addRecipe(staticRecipes, newRecipe) {
  const stored = loadStoredRecipes();
  const recipeToSave = {
    id: getNextId(staticRecipes, stored),
    name: '',
    category: '',
    image: '',
    time: '',
    servings: 1,
    ingredients: [],
    instructions: [],
    comments: [],
    ...newRecipe
  };
  const updated = [...stored, recipeToSave];
  saveStoredRecipes(updated);
  return recipeToSave;
}

export function deleteRecipe(staticRecipes, id) {
  const stored = loadStoredRecipes();
  const idx = stored.findIndex(r => String(r.id) === String(id));
  if (idx !== -1) {
    stored.splice(idx, 1);
    saveStoredRecipes(stored);
    return true;
  }
  const deleted = loadDeletedIds();
  if (!deleted.includes(id)) {
    deleted.push(id);
    saveDeletedIds(deleted);
  }
  return true;
}

export function updateRecipe(staticRecipes, updated) {
  const id = updated.id;
  if (id == null) return false;
  const stored = loadStoredRecipes();
  const idx = stored.findIndex(r => String(r.id) === String(id));
  if (idx !== -1) {
    const merged = { ...stored[idx], ...updated, id: stored[idx].id };
    stored[idx] = merged;
    saveStoredRecipes(stored);
    return true;
  }
  const overrides = loadOverrides();
  const base = {};
  overrides[String(id)] = { ...base, ...updated, id: undefined };
  saveOverrides(overrides);
  return true;
}

export function addComment(staticRecipes, id, comment) {
  const stored = loadStoredRecipes();
  const sIdx = stored.findIndex(r => String(r.id) === String(id));
  if (sIdx !== -1) {
    const existing = Array.isArray(stored[sIdx].comments) ? stored[sIdx].comments : [];
    const normalized = { ...comment, replies: Array.isArray(comment.replies) ? comment.replies : [] };
    stored[sIdx] = { ...stored[sIdx], comments: [...existing, normalized] };
    saveStoredRecipes(stored);
    return true;
  }
  const overrides = loadOverrides();
  const staticBase = staticRecipes.find(r => String(r.id) === String(id));
  const existingOverride = overrides[String(id)];
  const currentComments = existingOverride && Array.isArray(existingOverride.comments)
    ? existingOverride.comments
    : (staticBase && Array.isArray(staticBase.comments) ? staticBase.comments : []);
  const mergedComments = [...currentComments, { ...comment, replies: [] }];
  const ov = { ...(overrides[String(id)] || {}) };
  ov.comments = mergedComments;
  overrides[String(id)] = ov;
  saveOverrides(overrides);
  return true;
}

export function addReply(staticRecipes, id, commentIndex, reply) {
  const stored = loadStoredRecipes();
  const sIdx = stored.findIndex(r => String(r.id) === String(id));
  if (sIdx !== -1) {
    const existing = Array.isArray(stored[sIdx].comments) ? stored[sIdx].comments : [];
    const comments = existing.map((c, idx) => {
      if (idx !== commentIndex) return c;
      const baseReplies = Array.isArray(c.replies) ? c.replies : [];
      return { ...c, replies: [...baseReplies, reply] };
    });
    stored[sIdx] = { ...stored[sIdx], comments };
    saveStoredRecipes(stored);
    return true;
  }
  const overrides = loadOverrides();
  const staticBase = staticRecipes.find(r => String(r.id) === String(id));
  const existingOverride = overrides[String(id)];
  const currentComments = existingOverride && Array.isArray(existingOverride.comments)
    ? existingOverride.comments
    : (staticBase && Array.isArray(staticBase.comments) ? staticBase.comments : []);
  const comments = currentComments.map((c, idx) => {
    if (idx !== commentIndex) return c;
    const baseReplies = Array.isArray(c.replies) ? c.replies : [];
    return { ...c, replies: [...baseReplies, reply] };
  });
  const ov = { ...(overrides[String(id)] || {}) };
  ov.comments = comments;
  overrides[String(id)] = ov;
  saveOverrides(overrides);
  return true;
}

export function deleteComment(staticRecipes, id, commentIndex) {
  const stored = loadStoredRecipes();
  const sIdx = stored.findIndex(r => String(r.id) === String(id));
  if (sIdx !== -1) {
    const existing = Array.isArray(stored[sIdx].comments) ? stored[sIdx].comments : [];
    const comments = existing.filter((_, idx) => idx !== commentIndex);
    stored[sIdx] = { ...stored[sIdx], comments };
    saveStoredRecipes(stored);
    return true;
  }
  const overrides = loadOverrides();
  const staticBase = staticRecipes.find(r => String(r.id) === String(id));
  const existingOverride = overrides[String(id)];
  const currentComments = existingOverride && Array.isArray(existingOverride.comments)
    ? existingOverride.comments
    : (staticBase && Array.isArray(staticBase.comments) ? staticBase.comments : []);
  const comments = currentComments.filter((_, idx) => idx !== commentIndex);
  const ov = { ...(overrides[String(id)] || {}) };
  ov.comments = comments;
  overrides[String(id)] = ov;
  saveOverrides(overrides);
  return true;
}
