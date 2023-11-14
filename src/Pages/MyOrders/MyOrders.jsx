import React from 'react'
import { Link } from 'react-router-dom'
import ListOrder from '../../Components/ListOrder/ListOrder'
import { useAppContext } from '../../Context/ContextAppProvider'
import SinCoincidencias from '../../Components/SinCoincidencias/SinCoincidencias'

const MyOrders = () => {
  const {orders} = useAppContext()

  const isAOrder = () => {
    if(orders.length === 0){
      return false
    } else if(orders.length !== 0) {
      return true
    }}

  return (
    <>
    {!isAOrder() && <SinCoincidencias message={"No hay ordenes creadas aun"}/>}
    {orders?.map((order, index) =>(
      <Link to={`/my-orders/${order.orderId}`} key={index}>
        <ListOrder
          date={order.date.orderDate}
          time={order.date.orderTime}
          totalProducts={order.productsQ}
          totalPrice={order.totalPrice}
          orderId={order.orderId}
        />
      </Link>
    ))} 
    </>
  )
}


export default MyOrders
