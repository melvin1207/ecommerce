import { useState } from "react"

const useForm = (data, text, postFunction) => {
  const [input, setInput] = useState(data)
  const [result, setResult] = useState(null)

  const sendData = (object) => {
    for(let value in object){
      if(object[value] === ''){
        setResult(`${text[value]} is required*`)
          return
        }
      }
      postFunction(object)
      setResult(null)
    }
    
    const handleSubmit = (e) => {
      e.preventDefault()
      sendData({...input})
    }

  return {
    input,
    setInput,
    handleSubmit,
    result,
    setResult,
  }
  
}

export {useForm}