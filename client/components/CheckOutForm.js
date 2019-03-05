import React, {Component} from 'react'
import {CardElement, Elements, injectStripe} from 'react-stripe-elements'
import StripeCheckout from './StripeCheckout'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'

class CheckoutForm extends Component {
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

            <StripeCheckout
              size="large"
              onSubmit={this.props.location.state.onSubmit}
            />
          </Grid.Column>
        </Grid>
      </Elements>
    )
  }
}

export default CheckoutForm
