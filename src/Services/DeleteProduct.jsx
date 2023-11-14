import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"
import { useAppContext } from "../Context/ContextAppProvider"
import { useAuthContext } from "../Context/ContextAuthProvider"

const BASE_URL = 'https://ecommerce-json-jwt.onrender.com/product'

const DeleteProduct = (id) => {
  const[deleteProduct, setDeleteProduct] = useState(null)
  const{setLoadSpinner, setShowModalMessage, setModalMessageToShow} = useAppContext()
  const{token} = useAuthContext()

  useEffect(()=>{
    if(id){
      setLoadSpinner(true)
  
      let data = JSON.stringify({id});
      let config = {
        method: 'delete',
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
        setDeleteProduct(response)
        setLoadSpinner(false)
  
        setShowModalMessage(true) 
        setModalMessageToShow({
          message: `item ${response.data[0].product_name} deleted successfully`,
          type: 'success'
        })
  
      })
      .catch((error) => {
        setDeleteProduct(error);
        setLoadSpinner(false)
  
        setShowModalMessage(true) 
        setModalMessageToShow({
          message: error.message,
          type: 'error'
        })
  
        console.log(error);
      });
  
    }
    
  }, [id])
  
  return{deleteProduct}
}

export default DeleteProduct
