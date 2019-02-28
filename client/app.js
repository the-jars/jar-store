import React, {Component} from 'react'
import {Navbar, Sidebar} from './components'
import {Grid, GridColumn} from 'semantic-ui-react'
import Routes from './routes'
import {connect} from 'react-redux'
import {fetchCartInfo} from './store/cart'
import {me} from './store/user'
// import 'semantic-ui-css/semantic.min.css'

//write thunk and call it
//thnk takes userid and...

export class App extends Component {
  componentDidMount() {
    //thunk with input!
    this.props.cartMeta(this.props.userId)
  }

  render() {
    return (
      <div>
        <Navbar />
        <Grid padded>
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
}
const mapStateToProps = state => ({
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  cartMeta: userId => dispatch(fetchCartInfo(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
