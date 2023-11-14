import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"
import { useAppContext } from "../Context/ContextAppProvider"

const BASE_URL = 'https://ecommerce-json-jwt.onrender.com/register'

const UseSignUp = (data, clearForm) => {
  const[signUpResponse, setSignUpResponse] = useState(null)
  const{setLoadSpinner, setShowModalMessage, setModalMessageToShow} = useAppContext()


useEffect(()=>{
  if(data){
    setLoadSpinner(true)
    axios.post(BASE_URL, data)
    .then(res => {
      setSignUpResponse(res)
      setLoadSpinner(false)
      clearForm()
      setShowModalMessage(true) 
      setModalMessageToShow({
        message: 'User created successfully, please Log In',
        type: 'success'
      })

    })
    .catch(err => {
      setSignUpResponse(err)
      console.log(err)
      setLoadSpinner(false)
    })
  }
}, [data])

return{signUpResponse}
}

export default UseSignUp
