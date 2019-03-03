import React from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {createNewCart, addItemToCart} from '../store/cart'

const AddItemButton = props => {
  const handleClick = () => {
    console.log(props)
    if (!props.cart.id) {
      props.createNewCart(props.userId, props.productId)
    } else {
      props.addItemToCart(props.productId, props.cart.id)
    }
  }

  return <Button onClick={handleClick}>Add To Cart</Button>
}

const mapStateToProps = state => ({
  cart: state.cartMeta
})

const mapDispatchToProps = dispatch => ({
  createNewCart: (userId, productId) =>
    dispatch(createNewCart(userId, productId)),
  addItemToCart: (productId, cartId) =>
    dispatch(addItemToCart(productId, cartId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddItemButton)
