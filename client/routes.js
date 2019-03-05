import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, EditProduct} from './components'
import {me} from './store'
import singleProduct from './components/singleProduct'
import ProductList from './components/ProductList'
import AddProduct from './components/AddProduct.js'
import AddCategory from './components/AddCategory.js'
import CheckoutForm from './components/CheckoutForm'

import UserOrderList from './components/UserOrderList.js'
import Cart from './components/Cart'
import SingleUserOrder from './components/SingleUserOrder'
import AddReview from './components/AddReview'
import Review from './components/Review'
import AdminOrderList from './components/AdminOrderList'
import UserList from './components/UserList'
import Checkout from './components/CheckoutPage'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}

        <Route path="/login" component={Login} />
        <Route path="/signup" render={() => <Signup type="signup" />} />
        <Route path="/cart" render={() => <Cart {...this.props} />} />
        <Route exact path="/checkoutform" component={CheckoutForm} />

        <Route exact path="/review/add" component={AddReview} />
        <Route exact path="/review" component={Review} />
        <Route exact path="/products/add" component={AddProduct} />
        <Route exact path="/categories/add" component={AddCategory} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/myorders" component={UserOrderList} />
        <Route exact path="/myorders/:orderId" component={SingleUserOrder} />
        <Route exact path="/admin/orders" component={AdminOrderList} />
        <Redirect exact from="/products/" to="/products" />
        <Route exact path="/users" component={UserList} />
        <Route path="/checkout" component={Checkout} />

        <Route path="/products/:id/edit" component={EditProduct} />

        <Route path="/products/:id" component={singleProduct} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
