import React, {Component} from 'react'
import {CardElement, Elements, injectStripe} from 'react-stripe-elements'

class StripeCheckout extends Component {
  constructor(props) {
    super(props)
    //create state to inform if charge is complete
    this.state = {complete: false}
    //bind submit method (below)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })
    //set state complete to true once payment goes through
    if (response.ok) {
      this.setState({complete: true})
      this.props.onSubmit()
    }
  }

  render() {
    //inform the customer that the charge completed
    if (this.state.complete) return <h1>Purchase Complete</h1>

    return (
      //render checkout form
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button type="submit" onClick={this.submit}>
          Send
        </button>
      </div>
    )
  }
}

export default injectStripe(StripeCheckout)
