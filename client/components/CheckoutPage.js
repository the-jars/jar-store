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
  Segment,
  Card
} from 'semantic-ui-react'

import {createOrder} from '../store/order'

class CheckoutPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="screen_shot_2019-02-27_at_3.40.20_pm.png" /> Checkout
        </Header>
        <Grid
          textAlign="center"
          style={{height: '100%'}}
          verticalAlign="middle"
        >
          <Form onSubmit={this.props.handleSubmit}>
            <Form.Field>
              <Header as="h4" color="teal" textAlign="center">
                Email
              </Header>
              <input
                icon="user"
                iconposition="left"
                placeholder="E-mail address"
                name="email"
                defaultValue={this.props.email}
              />
            </Form.Field>
            <Grid.Column>
              <Header as="h4" color="teal" textAlign="center">
                Shipping Address
              </Header>
              <Card>
                <Form.Field inline>
                  <label>Street Address</label>
                  <input name="shipping_line_1" />
                </Form.Field>
                <Form.Field inline>
                  <label>Address 2</label>
                  <input name="shipping_line_2" />
                </Form.Field>
                <Form.Field inline>
                  <label>City</label>
                  <input name="shipping_city" />
                </Form.Field>
                <Form.Field inline>
                  <label>State</label>
                  <input name="shipping_state" />
                </Form.Field>
                <Form.Field inline>
                  <label>ZIP</label>
                  <input name="shipping_zip" />
                </Form.Field>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" color="teal" textAlign="center">
                Shipping Address
              </Header>
              <Card>
                <Form.Field inline>
                  <label>Street Address</label>
                  <input name="billing_line_1" />
                </Form.Field>
                <Form.Field inline>
                  <label>Address 2</label>
                  <input name="billing_line_2" />
                </Form.Field>
                <Form.Field inline>
                  <label>City</label>
                  <input name="billing_city" />
                </Form.Field>
                <Form.Field inline>
                  <label>State</label>
                  <input name="billing_state" />
                </Form.Field>
                <Form.Field inline>
                  <label>ZIP</label>
                  <input name="billing_zip" />
                </Form.Field>
              </Card>
            </Grid.Column>

            <Button type="submit">Place Order</Button>
          </Form>
        </Grid>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(evt) {
    evt.preventDefault()

    const email = evt.target.email.value
    // get the shipping address data
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
    // get the billing address data
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

    return dispatch(
      createOrder(ownProps.cart, shippingAddress, billingAddress, email)
    )
  }
})

export default connect(mapState, mapDispatch)(CheckoutPage)
