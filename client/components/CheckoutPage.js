import React from 'react'
import {connect} from 'react-redux'
import {Button, Form, Grid, Header, Image, Table, Card} from 'semantic-ui-react'
import {createOrder} from '../store/order'

class CheckoutPage extends React.Component {
  constructor() {
    super()
    this.email = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.email.current.value = this.props.user.email
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const email = evt.target.email.value
    // get the shipping address data
    console.log('yeah submit!!!')
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
      state: shipping_state.value,
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

    const cartId = this.props.cartId
    const cartItems = this.props.cartItems
    const totalCost = this.props.location.state.total

    this.props.history.push('/checkoutform', {
      cartId,
      cartItems,
      shippingAddress,
      billingAddress,
      email,
      totalCost
    })
  }

  render() {
    return (
      <div>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="screen_shot_2019-02-27_at_3.40.20_pm.png" /> Checkout
        </Header>
        <Grid textAlign="center">
          <Form onSubmit={this.handleSubmit}>
            <Grid.Row>
              <Form.Field>
                <Header as="h4" color="teal" textAlign="center">
                  Email
                </Header>
                <input
                  icon="user"
                  iconposition="left"
                  placeholder="E-mail address"
                  type="text"
                  name="email"
                  ref={this.email}
                />
              </Form.Field>
              <Grid.Column>
                <Header as="h4" color="teal" textAlign="center">
                  Shipping Address
                </Header>
                <Card>
                  <Form.Field inline>
                    <label>Street Address</label>
                    <input type="text" name="shipping_line_1" />
                  </Form.Field>
                  <Form.Field inline>
                    <label>Address 2</label>
                    <input type="text" name="shipping_line_2" />
                  </Form.Field>
                  <Form.Field inline>
                    <label>City</label>
                    <input type="text" name="shipping_city" />
                  </Form.Field>
                  <Form.Field inline>
                    <label>State</label>
                    <input type="text" name="shipping_state" />
                  </Form.Field>
                  <Form.Field inline>
                    <label>ZIP</label>
                    <input type="text" name="shipping_zip" />
                  </Form.Field>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4" color="teal" textAlign="center">
                  Billing Address
                </Header>
                <Card>
                  <Form.Field inline>
                    <label>Street Address</label>
                    <input type="text" name="billing_line_1" />
                  </Form.Field>
                  <Form.Field inline>
                    <label>Address 2</label>
                    <input type="text" name="billing_line_2" />
                  </Form.Field>
                  <Form.Field inline>
                    <label>City</label>
                    <input type="text" name="billing_city" />
                  </Form.Field>
                  <Form.Field inline>
                    <label>State</label>
                    <input type="text" name="billing_state" />
                  </Form.Field>
                  <Form.Field inline>
                    <label>ZIP</label>
                    <input type="text" name="billing_zip" />
                  </Form.Field>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Card centered>
                <Table basic="very" celled collapsing>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Header>
                          <Header.Content>Total</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        {this.props.location.state &&
                          this.props.location.state.total}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                  <Button type="submit">Purcase</Button>
                </Table>
              </Card>
            </Grid.Row>
          </Form>
        </Grid>
      </div>
    )
  }
}

const mapState = state => ({
  cartId: state.cartMeta.id,
  cartItems: state.cart,
  user: state.user
})

export default connect(mapState)(CheckoutPage)
