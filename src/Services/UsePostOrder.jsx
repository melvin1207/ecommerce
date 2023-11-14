import { useEffect, useState } from "react"
import axios from "axios"
import { useAppContext } from "../Context/ContextAppProvider"
import { useAuthContext } from "../Context/ContextAuthProvider"
import {UseGetOrders} from './UseGetOrders'

const BASE_URL = 'https://ecommerce-json-jwt.onrender.com/order'

const usePostOrder = (dataToPost) => {
  const[postOrderResponse, setPostOrderResponse] = useState(null)
  const{setLoadSpinnner, setShowModalMessage, setModalMessageToShow} = useAppContext()
  const{token} = useAuthContext()
  const{setUserOrders} = UseGetOrders()

useEffect(()=>{
  if(dataToPost){
    setLoadSpinnner(true)
    let data = JSON.stringify(dataToPost);

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
      setPostOrderResponse(response)
      setLoadSpinnner(false)
      setUserOrders(true)
      setShowModalMessage(true) 
      setModalMessageToShow({
        message: 'Order created successfully',
        type: 'success'
      })
    })
    .catch((error) => {
      setPostOrderResponse(error);
      setLoadSpinnner(false)
      setShowModalMessage(true) 
      setModalMessageToShow({
        message: 'Network problems, please try again in a moment',
        type: 'error'
      })
      console.log(error);
    });
  }
  
}, [dataToPost])

return{postOrderResponse}

}

export {usePostOrder}