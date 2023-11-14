import axios from "axios"
const BASE_URL = 'https://ecommerce-json-jwt.onrender.com/product'


const DeleteProductService = (id, token) => {
  let data = JSON.stringify({id})

  let config = {
    method: "delete",
    maxBodyLenght: Infinity,
    url: BASE_URL,
    headers: {
      "Context-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
    }

  return axios.request(config)
}

export default DeleteProductService
