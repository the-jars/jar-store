import React, {Component} from 'react'
import {Navbar, Sidebar} from './components'
import {Grid, GridColumn} from 'semantic-ui-react'
import Routes from './routes'
import {connect} from 'react-redux'
import {fetchCartInfo} from './store/cart'
import {me} from './store/user'
// import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return (
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
  )
}
const mapStateToProps = state => ({
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  instantiateCart: userId => dispatch(fetchCartInfo(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
