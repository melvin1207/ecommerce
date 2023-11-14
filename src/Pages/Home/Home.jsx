import React from 'react'
import { useEffect } from 'react'
import Card from '../../Components/Card/Card'
import SinCoincidencias from '../../Components/SinCoincidencias/SinCoincidencias'
import Product from '../../Components/Product/Product'
import { useAppContext } from '../../Context/ContextAppProvider'
import { useLocation, useParams } from 'react-router-dom'
import ErrorView from '../../Components/ErrorView/ErrorView'
import CategoriesBubbles from '../../Components/CategoriesBubbles/CategoriesBubbles'
import './home.scss'

const Home = () => {
  const {
    items,
    searchInput,
    setSearchInput,
    errorView,
  } = useAppContext();

  const { category, searchText} = useParams()
  const location = useLocation()

  useEffect(() => {
    if(searchText){
      setSearchInput(searchText)
    }
  }, [searchText])

  const filterItems = () => {
    if(!category){
      const itemsFiltered = items?.filter((item) =>
      item.product_name.toLowerCase().includes(searchInput.toLowerCase()))
      return itemsFiltered
    } else {
      const itemsFiltered = items?.filter((item) =>
      item.product_name.toLowerCase().includes(searchInput.toLowerCase()))

      let itemsFilteredSearchCategory

      if(category !== "Others"){
        itemsFilteredSearchCategory = itemsFiltered?.filter(
          (item) =>
            item.category.toLowerCase() === category.toLocaleLowerCase()
        )
      } else if (category === "Others") {
        const categories = [
          "Toys",
          "Games",
          "Garden",
          "Tools",
          "Outdoors",
        ]

        itemsFilteredSearchCategory = itemsFiltered?.filter(
          (item) => {
            const mainCategories = categories.find(
              (category) => item.category === category
            )

            if(!mainCategories){
              return true
            } else {
              return false
            }
          }
        )
      }
      return itemsFilteredSearchCategory
    }
  }

  const itemFiltered = filterItems()
  const findTag = `Results for search: '${searchText}'`

  const pageTitle = () => {
    if(!category){
      if(searchText){
        return findTag
      }
      return "All Products"
    } else{
      return category
    }
  }

  const isMatch = () => {
    if(itemFiltered?.length === 0){
      return false;
    }
    if(itemFiltered?.length !== 0){
      return true
    }
  }

  return(
    <>
      {errorView && <ErrorView/>}
      {!errorView && (
        <>
          <div className='d-flex'>
            {itemFiltered && (<h1>{pageTitle}</h1>)}
          </div>
          {!isMatch() && (
            <SinCoincidencias message={"No hay coincidencias"}/>
          )}
          <div className='row text-center p-5 justify-content-center'>
            {itemFiltered?.map((item) => {
              const {category, product_name, price, image, id} = item
              return(
                <Card
                  item = {item}
                  category = {category}
                  product_name = {product_name}
                  price={price}
                  image={image}
                  key={id}
                  id={id}
                />
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

export default Home
