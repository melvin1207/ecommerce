import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useForm } from '../../hooks/useForm'
import UseLogin from '../../Services/UseLogin'
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

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="log-in">
        <h2>Login to your account</h2>
        <form 
          className="custom-form flex flex-col items-center" 
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder="Email"
            value={input.email}
            onChange={handleOnChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={input.password}
            onChange={handleOnChange}
          />
          {requestResult && <p className="required-message">{requestResult}</p>}
          <p className="create-account-message">¿New user? <Link className='underline font-light' to={'/sign-up'}>Create your account</Link></p>
          <button type="submit">LOGIN</button>
        </form>
      </div>
      </div>
  );
}
}

export default Login