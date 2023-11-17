import React from 'react'
import { useEffect, useState } from "react";
import {useForm} from '../../hooks/useForm'
import UseSignUp from '../../Services/UseSignUp'
import { useNavigate } from 'react-router-dom';
import './signup.scss'

const SignUp = () => {
  const[postData, setPostData] = useState(null)
  const navigate = useNavigate()

  const data = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "",
    role: "",
  };

  const dataRequired = {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    password: "Password",
    gender: "Gender",
    role: "Role",
  } 

  const apiPostForm = (objectToSend)=> {
    setPostData(objectToSend)
  }

  const clearForm = ()=> {
    setInput(data)
  }

  const {signUpResponse} = UseSignUp(postData, clearForm)

  useEffect(()=>{
    if(signUpResponse){
      if(signUpResponse.code === 'ERR_NETWORK'){
          setRequestResult('We are having problems, please try again in a moment')
      } else if(signUpResponse.response?.status === 400 || signUpResponse.response?.status === 401 || signUpResponse.response?.status === 404 || signUpResponse.response?.status === 403){
        setRequestResult(signUpResponse.response?.data?.message)
      }else if(signUpResponse.status === 201){
        setRequestResult('You are successfully Signed Up')
        navigate('../log-in')
      } else {
        setRequestResult('Uncontrolled error')
      }
    }
    }, [signUpResponse])
  

  const handleOnchange = (e)=>{
    setInput((previousValue) => ({...previousValue, [e.target.name]: e.target.value}))
  }

  const { input, setInput, handleSubmit, requestResult, setRequestResult} = useForm(data, dataRequired, apiPostForm);

  return (
<div className="container m-5 p-5 d-flex justify-content-center">
      <div className="sign-up">
      <legend>Sign Up</legend>
        <form
          className="custom-form d-flex flex-column"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          
          <input
          className='form-control m-1'
            type="text"
            name="first_name"
            id="first_name"
            placeholder="First Name"
            value={input.first_name}
            onChange={handleOnchange}
          />
          <input
          className='form-control m-1'
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Last Name"
            value={input.last_name}
            onChange={handleOnchange}
          />
          <input
          className='form-control m-1'
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={input.email}
            onChange={handleOnchange}
          />
          <input
          className='form-control m-1'
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={input.password}
            onChange={handleOnchange}
          />
          <div className="d-flex">
            <label className="form-label" htmlFor="gender">
              Gender
            </label>
            <select 
            className='form-select'
            name="gender" 
            id="gender"
            value={input.gender}
            onChange={handleOnchange}
            >
              <option value=""></option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          <div className="d-flex">
            <label className="form-label" htmlFor="role">
              Role
            </label>
            <select 
            className='form-select'
            name="role" 
            id="role"
            value={input.role}
            onChange={handleOnchange}
            >
              <option value=""></option>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <p className="required-message">{requestResult}</p>
          <button type="submit" className='btn btn-primary'>SIGNUP</button>
        </form>
      </div>
      </div>
  )
}

export default SignUp
