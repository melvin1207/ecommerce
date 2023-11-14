import { createContext, useContext, useState } from "react";
import UseNewItems from "../Services/UseNewItems";

const AppContext = createContext()

// eslint-disable-next-line react/prop-types
const ContextAppProvider = ({children})=> {

  const[loadSpinner, setLoadSpinner] = useState(false)

  const[logoutCard, setLogoutCard] = useState(false)

  const[showAccountCard, setShowAccountCard] = useState(false)

  const[errorView, setErrorView] = useState(false)

  const [showBurger, setShowBurger] = useState(false)

  const[showModalMessage, setShowModalMessage] = useState(false)
  const[modalMessageToShow, setModalMessageToShow] = useState({
        message: '',
        type: ''
    })

// Api Info
  const { items, setNewItems } = UseNewItems(setLoadSpinner, setErrorView)

//Shopping cart - items list / addToCart / removeFromCart / deleteFromCart
  const [carItems, setCarItems] = useState([])
  const addToCart = (e, item, hasToCloseDetail = true) => {
    e.stopPropagation()
    const itemIsAdded = carItems.findIndex((carItem)=> carItem.id === item.id)
    if(itemIsAdded === -1){
      const updateCarQuantity = {...item, ['itemQuantity']: 1}
      setCarItems([...carItems, updateCarQuantity])
    }else{
      const copyCartToUpdateQuantity = [...carItems]
      copyCartToUpdateQuantity[itemIsAdded]['itemQuantity'] = copyCartToUpdateQuantity[itemIsAdded]['itemQuantity'] + 1
      setCarItems(copyCartToUpdateQuantity)
    }

    if(hasToCloseDetail){
      closeDetail()
    }
  }

  const removeFromCart = (e, item, hasToCloseDetail = true) => {
    e.stopPropagation()
    const itemIsAdded = carItems.findIndex((carItem)=> carItem.id === item.id)
    const copyForUpdateCar = [...carItems]
    let productQuantity = copyForUpdateCar[itemIsAdded]['itemQuantity']

    if(productQuantity > 1){
            copyForUpdateCar[itemIsAdded]['itemQuantity'] = copyForUpdateCar[itemIsAdded]['itemQuantity'] -1 
            setCarItems([...copyForUpdateCar])
    } else{
        deleteIdFromCart(item.id)
    }

    if(hasToCloseDetail){
        closeDetail()
    }
  }

    const deleteIdFromCart = (id) => {
      const updatedCart = carItems.filter((item) => (
          item.id !== id
      ))
      setCarItems(updatedCart)
    }

//Product Detail - Open / Close
    const [showDetail, setShowDetail] = useState(false)
    const openDetail = (product) => {
        setProductToShow(product)
        setShowCheckoutList(false)
        setShowDetail(true)
        setShowBurger(false)
        setShowAccountCard(false)
    }
    const closeDetail = ()=> setShowDetail(false)

//Product Detail - Info to Show Aside Detail
    const [productToShow, setProductToShow] = useState({})

// Checkout Side Menu Close / Open
    const [showCheckoutList, setShowCheckoutList] = useState(false)
    const closeSideCheckoutMenu = ()=> {
        setShowCheckoutList(false)
    }
    const openSideCheckoutMenu = ()=> {
        setShowCheckoutList(!showCheckoutList)
        closeDetail()
    }

// Order checkout main information
    const [orders, setOrders] = useState([])

// search Bar Value
    const [searchInput, setSearchInput] = useState("");

// Clear searchInput
    const clearSearchInput = ()=>{
        setSearchInput("")
    }

//Context Value
  const valuesObject = {
    items,
    showDetail,
    openDetail,
    closeDetail,
    productToShow,
    setProductToShow,
    carItems,
    addToCart,
    removeFromCart,
    closeSideCheckoutMenu,
    openSideCheckoutMenu,
    showCheckoutList,
    deleteIdFromCart,
    orders,
    setOrders,
    setCarItems,
    searchInput, 
    setSearchInput,
    clearSearchInput,
    setShowDetail,
    setShowCheckoutList,
    loadSpinner,
    setLoadSpinner,
    errorView,
    logoutCard, 
    setLogoutCard,
    showAccountCard, 
    setShowAccountCard,
    setNewItems,
    showModalMessage, 
    setShowModalMessage,
    modalMessageToShow, 
    setModalMessageToShow,
    showBurger, 
    setShowBurger
  }

return(
    <AppContext.Provider value={valuesObject}>
        {children}
    </AppContext.Provider>
)
}

const useAppContext = () => {
    const contextValue = useContext(AppContext)
    return contextValue
}

// eslint-disable-next-line react-refresh/only-export-components
export {ContextAppProvider, useAppContext}