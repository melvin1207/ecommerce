import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../Context/ContextAppProvider'
import NavBarSearch from '../NavBarSearch/NavBarSearch'
import SpinnerModal from '../Spinners/SpinnerModal'
import LogOut from '../LogOut/LogOut'
import { useState } from 'react'
import MyAccount from '../MyAccount/MyAccount'
import { useAuthContext } from '../../Context/ContextAuthProvider'
import ModalMessage from '../ModalMessage/ModalMessage'
import Product from '../Product/Product'
import './navbar.scss'

const categories = [
  { to: "/", text: "Todo" },
  { to: "/categories/Kids", text: "Kids" },
  { to: "/categories/Shoes", text: "Shoes" },
  { to: "/categories/Grocery", text: "Grocery" },
  { to: "/categories/Computers", text: "Computers" },
  { to: "/categories/Toys", text: "Toys" },
  { to: "/categories/Tools", text: "Tools" },
  { to: "/categories/Sports", text: "Sports" },
  { to: "/categories/Outdoors", text: "Outdoors" },
  { to: "/categories/Jewelery", text: "Jewelery" },
  { to: "/categories/Others", text: "Electronics" }
];

const NavBar = () => {
  const {
    carItems,
    openSideCheckoutMenu,
    clearSearchInput,
    loadSpinner,
    showLogoutModal,
    setLogoutCard,
    showModalMessage,
    setShowCheckoutList,
    setShowDetail,
    setShowAccountCard,
    showBurger, 
    setShowBurger
  } = useAppContext();

  const { token, user } = useAuthContext();
  const [searchValue, setSearchValue] = useState("");

  const closeModal = () => {
    setShowCheckoutList(false)
    setShowDetail(false)
    setShowAccountCard(false)
    setShowBurger(false)
  }

  const userIsAdmin = ()=>{
    if(user?.role === 'ADMIN'){
      return true
    } else {
      return false
    }
  }


  return (
    <>
      {loadSpinner && <SpinnerModal/>}
      {showLogoutModal && <LogOut/>}
      {showModalMessage && <ModalMessage/>}
      {token && <MyAccount/>}
      <Product/>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <NavLink to="/" onClick={closeModal} className="brand">
              BUYONLINE
            </NavLink>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Todo</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categorias
                  </a>
                <ul className="dropdown-menu">
                  {categories.map((category, index) => {
                    return(
                    <div key={index}>
                    <li className="dropdown-item">
                        <NavLink
                          to={category.to}
                          className={({ isActive }) =>
                          isActive ? 'is-active' : undefined,
                          "category"
                          }
                        onClick={closeModal}>
                          <div className="category">
                            {category.text}
                          </div>
                        </NavLink>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                    </div>
                    )
                  })}
                </ul>
                </li>
              </ul>
          </div>
          
          {!token && (<li className="nav-link active mx-3">
            <NavLink
              to="/log-in"
              className={({ isActive }) => (isActive ? 'is-active' : undefined), "nav-link active"}
              onClick={closeModal}
            >
              Log In
            </NavLink>
          </li>)}

          {!token && (<li className="nav-link active mx-3">
            <NavLink
              to="/sign-up"
              className={({ isActive }) => (isActive ? 'is-active' : undefined), "nav-link active"}
              onClick={closeModal}
            >
              Sign Up
            </NavLink>
          </li>)}

          {(token && userIsAdmin())&& (<li className="hide-on-desktop highlight">
            <NavLink
              to="/admin-products"
              className={({ isActive }) => (isActive ? 'is-active--products' : undefined)}
              onClick={closeModal}
            >
              <div className="flex items-center">
                <Lock />
              Products
              </div>
            </NavLink>
          </li>)}

          {token && (<li
            onClick={() => {
              setLogoutCard(true)
              closeModal()
              }}
            className="cursor-pointer hide-on-desktop highlight">
            Log Out
          </li>)}

          <div>
            <NavBarSearch
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              closeModal={closeModal}/>
          </div>

          <ul className="navbar-actions">

{user?.first_name && (
  <p className="hide-on-mobile-rigth text-black/60">Hi {user.first_name}</p>
)}

</ul>


{(token && userIsAdmin())&& (<li className="hide-on-mobile-rigth">
  <NavLink
    to="/admin-products"
    className={({ isActive }) => (isActive ? 'is-active--products' : undefined)}
    onClick={closeModal}
  >
    <div className="d-flex align-items-center">
      
    Products
    </div>
  </NavLink>
</li>)}

<div
  className="d-flex align-content-center"
  onClick={()=> {
    openSideCheckoutMenu()
    setShowDetail(false)
    setShowAccountCard(false)
    setShowBurger(false)
    }
  }>
  <div className="car-counter">
    {carItems.length}
  </div>
</div>
</div>
      </nav>
    </>
  )
}

export default NavBar
