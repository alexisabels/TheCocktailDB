
import React, { useEffect, useState } from "react";
import { getCocktailDetail } from "../../services/cocktailapi";
import "./PopularDrinks.css";
import { Link } from "react-router-dom";

const PopularDrinks = () => {
  const [cocktails, setCocktails] = useState([]);
  const cocktailIds = [
    "178365", // Gin Tonic
    "178366", // Gin Lemon
    "11007", // Margarita
    "11202", // Caipirinha
    "11001", // Old Fashioned
    "11064", // Banana Daiquiri
    "13020", // Sangria
    "13206"  // Caipirissima
  ];
  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const cocktailsArray = [];

        // Iterar sobre los IDs de los cócteles y obtener los detalles para cada uno
        for (let id of cocktailIds) {
          const cocktailDetail = await getCocktailDetail(id);
          cocktailsArray.push(cocktailDetail.drinks[0]);
        }

        setCocktails(cocktailsArray);
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    };

    fetchCocktails();
  }, []);

  return (
    <div className="random-cocktails-container">
      <h2>Nuestros Favoritos</h2>
      <div className="cocktail-grid text-link">
        {cocktails.map((cocktail) => (
          <Link key={cocktail.idDrink} to={"/drink/" + cocktail.idDrink} className="col-3 cocktail-card text-link">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <div className="cocktail-name text-link">{cocktail.strDrink}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularDrinks;