import React, {Component} from 'react'
import {fetchCartItems} from '../store/cart'
import {connect} from 'react-redux'
// import {fetchUser} from '../store/user'
import {me} from '../store/user'

export class Cart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // console.log('props', this.props)
    // this.props.fetchCartItems(this.props.user.id)
    // if (this.props.user && this.props.user.id) {
    //   this.props.fetchCartItems(this.props.user.id)
    // }

    return (
      <div>
        <h1>Your Cart</h1>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchCartItems: userId => dispatch(fetchCartItems(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
