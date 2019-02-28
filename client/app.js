import React from 'react'
import {Navbar, Sidebar} from './components'
import {Grid} from 'semantic-ui-react'
import Routes from './routes'
// import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Navbar />
        </Grid.Row>
        <Grid.Row>
          <Sidebar />
          <Routes />
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default App
