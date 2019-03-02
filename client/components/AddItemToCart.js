import React from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addOrCreateCart} from './store/cart'

const AddItemButton = props => {
  const handleClick = () => {
    let cartId
    !props.cart.id ? (cartId = null) : (cartId = props.cart.id)
    const productId = props.productId
    addOrCreateCart(cartId, productId)
  }

  return <Button onClick={handleClick}>Add To Cart</Button>
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  addOrCreateCart: () => dispatch(addOrCreateCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddItemButton)
