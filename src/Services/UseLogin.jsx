import { useEffect, useState } from "react"
import axios from "axios"
import { useAppContext } from "../Context/ContextAppProvider"
import { useAuthContext } from "../Context/ContextAuthProvider"

const BASE_URL = 'https://ecommerce-json-jwt.onrender.com/login'

const UseLogin = (data, clearForm) => {
  const[logInResponse, setLoginResponse] = useState(null)
  const{setLoadSpinner} = useAppContext()
  const{setToken} = useAuthContext()

useEffect(()=>{
    if(data){
      setLoadSpinner(true)
      axios.post(BASE_URL, data)
      .then(res => {
        setLoginResponse(res)
        if(res.status === 200){
          const jwt = res.data.token
            setToken(jwt)
        }
        setLoadSpinner(false)
          clearForm()
        })
      .catch(err => {
        setLoginResponse(err)
        console.log(err)
        setLoadSpinner(false)
      })
    }
}, [data])

  return{logInResponse}
  
}

export default UseLogin
