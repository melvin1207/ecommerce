import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = "https://ecommerce-json-jwt.onrender.com/items"

const UseNewItems = (loadSpinner, errorView) => {
  const [items, setItems] = useState(null);
  const [newItems, setNewItems] = useState(true)
  
  useEffect(() => {
    if(newItems){
      loadSpinner(true);
      axios.get(BASE_URL)
        .then((items) => {
          loadSpinner(false);
          setItems(items.data)
          setNewItems(null)
        })
        .catch((err) => {
          errorView(true)
          console.log(err);
          loadSpinner(false);
          setNewItems(null)
        });
    }
  }, [newItems]);
  
  return { items, setNewItems }
}

export default UseNewItems
