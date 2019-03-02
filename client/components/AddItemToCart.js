import React from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

const AddItemButton = props => {
  const handleClick = event => {}

  return <Button onClick={handleClick}>Add To Cart</Button>
}

const mapStateToProps = state => {
  cartId = state.cart.id
}

export default connect(mapStateToProps)(AddItemButton)
