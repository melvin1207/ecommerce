import { useEffect, useState } from "react"
import { useForm } from '../../hooks/useForm'
import UseLogin from '../../Services/UseLogin'
import { Link, useNavigate } from "react-router-dom"
import './login.scss'

function Login() {
  const [postData, setPostData] = useState(null)
  const navigate = useNavigate();

  const datain = {
    email: "",
    password: ""
  }

  const dataTextRequired = {
    email: "Email",
    password: "Password"
  }

  const postForm = (dataToSend) => {
    setPostData(dataToSend)
  }

  const clearForm = () => {
    setInput(datain)
  }

  const {loginanswer} = UseLogin(postData, clearForm)

  useEffect(() => {
    if(loginanswer){
      if(loginanswer.code === 'ERR_NETWORK'){
        setRequestResult('Intente más tarde')
      } else if (loginanswer.response?.status === 400 || loginanswer.response?.status === 401 || loginanswer.response?.status === 404){
        setRequestResult('Correo o contraseña Incorrectos')
      } else if (loginanswer.status === 200){
        setRequestResult('Haz entrado correctamente con el token: ' + loginanswer.data.token[0] + '....')
        navigate('../')
      } else {
        setRequestResult('error desconocido')
      }
    }
  }, [loginanswer])

const { input, setInput, handleSubmit, requestResult, setRequestResult} = useForm(datain, dataTextRequired, postForm)

const handleOnChange = (e) => {
  setInput((previousValue) => ({
    ...previousValue,
    [e.target.name]: e.target.value,
  }))
}

  return (
    <div className="container m-5 p-4 d-flex flex-column">
      <legend>Login to your account</legend>
      <div className="log-in d-flex flex-column">
        <form 
          className="d-flex flex-column align-items-center container-sm" 
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input 
            className="form-control m-3"
            type="email" 
            name="email" 
            id="email" 
            placeholder="Email"
            value={input.email}
            onChange={handleOnChange}
          />
          <input
            className="form-control m-2"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={input.password}
            onChange={handleOnChange}
          />
          {requestResult && <p className="required-message">{requestResult}</p>}
          <h5 className="m-2">Eres Nuevo? <Link className='underline' to={'/sign-up'}>Crea tu cuenta</Link></h5>
          <button type="submit" className="btn btn-primary m-2">LOGIN</button>
        </form>
      </div>
      </div>
  );
}


export default Login