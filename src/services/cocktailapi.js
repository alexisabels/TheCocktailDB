const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export function getCocktailByName(name) {
  return fetchJson(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`);
}

export function getCocktailsByURL(url) {
  return fetchJson(url);
}

export function getIngredientByName(name) {
  return fetchJson(`${BASE_URL}/search.php?i=${encodeURIComponent(name)}`);
}

export function getCocktailDetail(id) {
  return fetchJson(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
}

export function getRandomCocktail() {
  return fetchJson(`${BASE_URL}/random.php`);
}

export function getCocktailsByIngredient(name) {
  return fetchJson(`${BASE_URL}/filter.php?i=${encodeURIComponent(name)}`);
}

export function getCocktailByLetter(letter) {
  return fetchJson(`${BASE_URL}/search.php?f=${encodeURIComponent(letter)}`);
}
