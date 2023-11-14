import React from 'react'
import { PacmanLoader } from 'react-spinners'
import './spinnermodel.scss'

const SpinnerModal = () => {
  return (
    <div className='spinner'>
      <PacmanLoader color='rgb(64, 64, 175)' loading/>
    </div>
  )
}

export default SpinnerModal
