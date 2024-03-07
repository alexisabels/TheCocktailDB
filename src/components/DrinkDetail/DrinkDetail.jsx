import React from 'react'
import { useEffect, useState } from 'react';
import { getCocktailByName } from '../../services/cocktailapi';

export default function DrinkDetail({ name }) {

  const [Data, setData] = useState(null)

  useEffect(() => {
    getCocktailByName(name)
      .then(json => {
        setData(json)
        console.log(json)
      })
  }, [])

  return (
    <div>
      {Data && (<div>{Data.name}</div>)}
      <img
        src={
         "drink.strDrinkThumb"
        }
        alt={""}
      />
    </div>
  )
}
