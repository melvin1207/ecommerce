import { useEffect, useState } from "react"
import axios from "axios"
import { useAppContext } from "../Context/ContextAppProvider"
import { useAuthContext } from "../Context/ContextAuthProvider"

const BASE_URL = 'https://ecommerce-json-jwt.onrender.com/product'

const CreateItem = (data) => {
  const[createItem, setCreateItem] = useState(null)
  const{setLoadSpinner, setShowModalMessage, setModalMessageToShow} = useAppContext()
  const{token} = useAuthContext()

useEffect(() => {
  if(data){
    setLoadSpinner(true)
    let data = JSON.stringify(data);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: BASE_URL,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      data : data
    };
  
  axios.request(config)
  .then((response) => {
    setCreateItem(response);
    setLoadSpinner(false)
    setShowModalMessage(true) 
    setModalMessageToShow({
      message: 'Producto creado',
      type: 'success'
    })
  })
  .catch((error) => {
    setCreateItem(error);
    setLoadSpinner(false)
    console.log(error);
    setShowModalMessage(true) 
    setModalMessageToShow({
      message: 'Tenemos problemas intente más tarde',
      type: 'error'
    })

  });

  }
}, [data])

return{createItem}


}

export default CreateItem
