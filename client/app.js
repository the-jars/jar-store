import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
// import 'semantic-ui-css/semantic.min.css'
import {StripeProvider} from 'react-stripe-elements'

const App = () => {
  return (
    // <StripeProvider apiKey="pk_test_12345">
    <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
      <div>
        <Navbar />

        <Routes />
      </div>
    </StripeProvider>
  )
}

export default App
