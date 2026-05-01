import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'cocktaildb:likes';
const CHANGE_EVENT = 'cocktaildb:likes-change';

function readLiked() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch (e) {
    return [];
  }
}

function writeLiked(ids) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (e) {
    // storage might be full or disabled; fail silently
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: ids }));
}

export default function useLikes() {
  const [liked, setLiked] = useState(readLiked);

  useEffect(() => {
    const sync = () => setLiked(readLiked());
    const onCustom = (e) => {
      setLiked(Array.isArray(e.detail) ? e.detail : readLiked());
    };
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) sync();
    };
    window.addEventListener(CHANGE_EVENT, onCustom);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(CHANGE_EVENT, onCustom);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const isLiked = useCallback((id) => liked.includes(String(id)), [liked]);

  const toggleLike = useCallback((id) => {
    const key = String(id);
    const current = readLiked();
    const next = current.includes(key)
      ? current.filter((x) => x !== key)
      : [...current, key];
    writeLiked(next);
    setLiked(next);
    return !current.includes(key);
  }, []);

  return { liked, isLiked, toggleLike };
}
