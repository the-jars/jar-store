import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'

import {createOrder} from '../store/order'

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const {
      shipping_line_1,
      shipping_line_2,
      shipping_city,
      shipping_state,
      shipping_zip
    } = evt.target
    const shippingAddress = {
      line_1: shipping_line_1.value,
      line_2: shipping_line_2.value,
      city: shipping_city.value,
      state: shipping_state,
      zip: shipping_zip.value
    }

    const {
      billing_line_1,
      billing_line_2,
      billing_city,
      billing_state,
      billing_zip
    } = evt.target
    const billingAddress = {
      line_1: billing_line_1.value,
      line_2: billing_line_2.value,
      city: billing_city.value,
      state: billing_state.value,
      zip: billing_zip.value
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input name="shipping_line_1" />
          <Form.Input name="shipping_line_2" />
          <Form.Input name="shipping_city" />
          <Form.Input name="shipping_state" />
          <Form.Input name="shipping_zip" />
          <Button type="submit">Place Order</Button>
        </Form>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = (dispatch, ownProps) => ({})

export default connect(mapState, mapDispatch)(CheckoutPage)
