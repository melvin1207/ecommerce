import { Navigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
const ContextAuthProvider = ({ children }) => {
  const[token, setToken] = useState(sessionStorage.getItem('token') || null)
  const[user, setUser] = useState(JSON.parse(sessionStorage.getItem('userInfo')) || null)

  const auth = {
    token,
    setToken,
    user, 
    setUser
  };

  useEffect(() => {
    if(token){
        const payload = token.split('.')[1]
        const info = JSON.parse(atob(payload))
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('userInfo', JSON.stringify(info))
        setUser(info)
    } else {
      setUser(null)
    }
}, [token])


  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
};

const useAuthContext = () => {
  const contextValue = useContext(AuthContext);
  return contextValue;
};

// eslint-disable-next-line react/prop-types
const AuthNoLoggedin = ({children}) => {
  const token = sessionStorage.getItem('token')
  if(!token){
    return <Navigate to='/log-in' />
  } else {
    return children
  }
}

// eslint-disable-next-line react/prop-types
const AuthLoggedin = ({children}) => {
  const token = sessionStorage.getItem('token')
  if(token){
    return <Navigate to='/' />
  } else {
    return children
  }
}

export { ContextAuthProvider, useAuthContext, AuthNoLoggedin, AuthLoggedin }