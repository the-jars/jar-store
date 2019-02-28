import React from 'react'
import {Navbar, Sidebar} from './components'
import {Grid, GridColumn} from 'semantic-ui-react'
import Routes from './routes'
// import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return (
    <div>
      <Grid padded>
        <Navbar />
        <Grid.Row columns={7} padded>
          <GridColumn width={3}>
            <Sidebar />
          </GridColumn>
          <GridColumn width={4}>
            <Routes />
          </GridColumn>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default App
