import React, { useEffect, useState } from "react";
import { getIngredientByName } from "../../services/cocktailapi";
import "./PopularIngredients.css";
import { Link } from "react-router-dom";

const PopularIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const ingredientNames = [
    "Whisky", 
    "Sugar", 
    "Gin", 
    "Tequila", 
  ];

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredientsArray = [];

        for (let ingredientName of ingredientNames) {
          const ingredient = await getIngredientByName(ingredientName);
          ingredientsArray.push(ingredient.ingredients[0]);
        }

        setIngredients(ingredientsArray);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <div className="popular-ingredients-container">
      <h2>Ingredientes Favoritos</h2>
      <div className="cocktail-grid text-link">
        {ingredients.map((ingredient) => (
          <Link key={ingredient.idIngredient} to={"/ingredients/" + ingredient.strIngredient} className="col-3 cocktail-card text-link">
            <img src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient}-Medium.png`} alt={ingredient.strIngredient} />
            <div className="cocktail-name text-link">{ingredient.strIngredient}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularIngredients;
