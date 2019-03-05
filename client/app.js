import React from 'react'
import {Navbar, Sidebar} from './components'
import {Grid, GridColumn} from 'semantic-ui-react'
import Routes from './routes'
// import 'semantic-ui-css/semantic.min.css'
import {Elements, StripeProvider} from 'react-stripe-elements'

const App = () => {
  return (
    // <StripeProvider apiKey="pk_test_12345">
    <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
      <div>
        <Navbar />
        {/* <Grid padded>
        <Grid.Row columns={15} padded>
          <GridColumn width={3}>
            <Sidebar />
          </GridColumn>
          <GridColumn width={7}> */}
        <Routes />
        {/* </GridColumn>
        </Grid.Row>
      </Grid> */}
      </div>
    </StripeProvider>
  )
}

export default App
