import React from 'react'
import { useState } from 'react'
import { useAppContext } from '../../Context/ContextAppProvider'
import { useAuthContext } from '../../Context/ContextAuthProvider'
import DeleteProduct from '../DeleteProduct/DeleteProduct'
import CarQuantity from '../CarQuantity/CarQuantity'
import './card.scss'

const Card = ({ category, product_name, image, price, item, id }) => {
  const { openDetail, addCart, carItems } = useAppContext()
  const { token, user } = useAuthContext()
  const [ showCard, setShowCard ] = useState(null)
  const [cDlete, setCDelete] = useState(false)
  const isCarItem = carItems.filter((item) => item.id === id).lenght > 0

  const confirm = (event) => {
    event.stopPropagation()
    setCDelete(true)
  }

  const cancel = (event) => {
    event.stopPropagation()
    setCDelete(false)
    setShowCard(false)
  }

  return (
    <div className="card m-2" onClick={() => openDetail(item)}>
    <div className="card-img bg-primary">
      <img src={image} className="card-img-top" alt={product_name} />
      {showCard && (
          <div className="confirm-delete-background">
          <div className="confirm-delete-container">
            <p className="confirm-delete-container__text">¿are you sure to delete this product?</p>
            <div className="confirm-delete-container__buttons">
              <button className="confirm-delete-container__buttons--green"
              onClick={confirm}
              >
                Confirm
              </button>
              <button className="confirm-delete-container__buttons--red"
              onClick={cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        )}
      {isCarItem && (
          <div className="add">
            <CarQuantity item={item} />
          </div>
        )}
      {!isCarItem && (
          <button
            className="add d-flex justify-content-center"
            onClick={(event) => addCart(event, item)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16">
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
            </svg>
          </button>
      )}
      {token && user.role === "ADMIN" && (
        <div className="custom-trash absolute top-0 left-0 flex justify-center items-center w-6 h-6 rounded-full m-2 text-sm">
          <DeleteProduct 
            id={id} 
            setShowCardConfirm={setShowCard}
            confirmDelete={cDlete}
          />
        </div>
      )}
    </div>
    
    <div className="card-body bg-primary">
      <h5 className="card-title">{product_name}</h5>
      <h6 className='card-text'>{category}</h6>
      <p className="card-text">{`$ ${price}`}</p>
    </div>
    </div>
  )
}

export default Card
