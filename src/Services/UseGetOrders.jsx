import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../Context/ContextAuthProvider";
import { useAppContext } from "../Context/ContextAppProvider";

const BASE_URL = 'https://ecommerce-json-jwt.onrender.com/orders'

const UseGetOrders = () => {
  const[userOrders, setUserOrders]=useState(false)
  const {user} = useAuthContext()
  const{setOrders, setLoadSpinner} = useAppContext()
  useEffect(() => {
    if(userOrders || user){
      setLoadSpinner(true);
      let data = JSON.stringify({
        "email": user.email
      })
    
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: BASE_URL,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
    
      axios.request(config)
      .then((res) => {
        if(res.data.result === 'NO-ORDERS'){
          setLoadSpinner(false);
          setOrders([])
          setUserOrders(null)
        } else if(res.data.result === 'ORDERS'){
          setLoadSpinner(false);
          setOrders(res.data.data)
          setUserOrders(null)
        }
      })
      .catch((err) => {
        console.log(err);
          setLoadSpinner(false);
          setUserOrders(null)
      });
    }
  }, [userOrders, user]);
  
    return { setUserOrders };
}

export default UseGetOrders
