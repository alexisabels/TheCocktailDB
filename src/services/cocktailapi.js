const URL_Cocktail = "https://www.thecocktaildb.com/api/json/v1/1";

//este no funciona
export async function getCocktails() {
  let data = await fetch(URL_Cocktail);
  let drinks = await data.json();
  console.log(drinks);
  return drinks.results;
}

//ESTE PARA BUSCAR
export async function getCocktailByName(name) {
  let data = await fetch(URL_Cocktail + "/search.php?s=" + name);
  let drink = await data.json();
  console.log(drink);
  return drink;

}

export async function getCocktailsByURL(URL) {
  let data = await fetch(URL);
  let coktail = await data.json();
  console.log(coktail);
  return coktail;
}

//este para buscar un ingerdiente (este creo que no lo usamos)
export async function getIngredientByName(name) {
  let data = await fetch(URL_Cocktail + "/search.php?i=" + name);
  let ingredient = await data.json();
  console.log(ingredient);
  return ingredient;

}
//este para ver el cocktail dentro
export async function getCocktailDetail(id) {
  let data = await fetch(URL_Cocktail + "/lookup.php?i=" + id);
  let detail = await data.json();
  console.log(detail);
  return detail;

}
//este para moostrar los randoms
export async function getRandomCocktail() {
  let data = await fetch(URL_Cocktail + "/random.php");
  let drink = await data.json();
  console.log(drink);
  return drink;

}
//este para sacar los cocktails de un ingrediente
export async function getCocktailsByIngredient(name) {
  let data = await fetch(URL_Cocktail + "/filter.php?i=" + name);
  let drinks = await data.json();
  console.log(drinks);
  return drinks;

}
//este para buscar por la primera letra
export async function getCocktailByLetter(letter) {
  let data = await fetch(URL_Cocktail + "/search.php?f=" + letter);
  let drinks = await data.json();
  console.log(drinks);
  return drinks;

}