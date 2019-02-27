import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

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
