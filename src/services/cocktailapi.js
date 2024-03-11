/* eslint-disable camelcase */
const URL_Cocktail = 'https://www.thecocktaildb.com/api/json/v1/1';

// este no funciona
export async function getCocktails() {
  const data = await fetch(URL_Cocktail);
  const drinks = await data.json();
  console.log(drinks);
  return drinks.results;
}

// ESTE PARA BUSCAR
export async function getCocktailByName(name) {
  const data = await fetch(`${URL_Cocktail}/search.php?s=${name}`);
  const drink = await data.json();
  console.log(drink);
  return drink;
}

export async function getCocktailsByURL(URL) {
  const data = await fetch(URL);
  const coktail = await data.json();
  console.log(coktail);
  return coktail;
}

// este para buscar un ingerdiente (este creo que no lo usamos)
export async function getIngredientByName(name) {
  const data = await fetch(`${URL_Cocktail}/search.php?i=${name}`);
  const ingredient = await data.json();
  console.log(ingredient);
  return ingredient;
}
// este para ver el cocktail dentro
export async function getCocktailDetail(id) {
  try {
    const data = await fetch(`${URL_Cocktail}/lookup.php?i=${id}`);
    if (!data.ok) {
      throw new Error('La solicitud no pudo ser completada');
    }
    const detail = await data.json();
    console.log(detail);
    return detail;
  } catch (error) {
    console.error('Error fetching cocktail detail:', error);
    throw error;
  }
}

// este para moostrar los randoms
export async function getRandomCocktail() {
  const data = await fetch(`${URL_Cocktail}/random.php`);
  const drink = await data.json();
  console.log(drink);
  return drink;
}
// este para sacar los cocktails de un ingrediente
export async function getCocktailsByIngredient(name) {
  const data = await fetch(`${URL_Cocktail}/filter.php?i=${name}`);
  const drinks = await data.json();
  console.log(drinks);
  return drinks;
}
// este para buscar por la primera letra
export async function getCocktailByLetter(letter) {
  const data = await fetch(`${URL_Cocktail}/search.php?f=${letter}`);
  const drinks = await data.json();
  console.log(drinks);
  return drinks;
}
