import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import SingleProduct from './components/singleProduct'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/*
      this is what was breaking the rendering and giving null error on match.params # jake
      <SingleProduct />
      */}
    </div>
  )
}

export default App
