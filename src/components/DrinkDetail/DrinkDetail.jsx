import React from 'react'
import { useEffect, useState } from 'react';
import { getCocktailDetail } from '../../services/cocktailapi';

export default function DrinkDetail({ id }) {

  const [Data, setData] = useState(null)

  useEffect(() => {
    getCocktailDetail(id)
      .then(json => {
        setData(json)
        console.log(json)
      })
  }, [id])

  return (
    <div>
      {Data && (<div>{Data.idDrink}</div>)}
      <img
        src={
         "drink.strDrinkThumb"
        }
        alt={""}
      />
    </div>
  )
}
