import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Elements} from 'react-stripe-elements'
import StripeCheckout from './StripeCheckout'
import {Grid, Header, Image} from 'semantic-ui-react'
import order, {createOrder} from '../store/order'

class CheckoutForm extends Component {
  constructor() {
    super()
    this.finalizeOrder = this.finalizeOrder.bind(this)
  }

  finalizeOrder() {
    this.props.createOrderThunk(this.props.location.state)
  }

  render() {
    return (
      <Elements>
        <Grid
          textAlign="center"
          style={{height: '100%'}}
          verticalAlign="middle"
        >
          <Grid.Column style={{maxWidth: 450}}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="screen_shot_2019-02-27_at_3.40.20_pm.png" /> Check Out
            </Header>

            <StripeCheckout size="large" finalizeOrder={this.finalizeOrder} />
          </Grid.Column>
        </Grid>
      </Elements>
    )
  }
}

const mapDispatch = dispatch => ({
  createOrderThunk: orderInfo => {
    const {
      cartId,
      cartItems,
      shippingAddress,
      billingAddress,
      email,
      totalCost
    } = orderInfo
    return dispatch(
      createOrder(
        cartId,
        cartItems,
        shippingAddress,
        billingAddress,
        email,
        totalCost
      )
    )
  }
})

export default connect(null, mapDispatch)(CheckoutForm)
