import React, {Component} from 'react'
import {connect} from 'react-redux'

// ACTIONS
import {fetchSingleProduct} from '../store/product.js'

class SingleProduct extends Component {
  async componentDidMount() {
    const currentProductId = this.props.match.params.id
    await this.props.setProduct(currentProductId)
  }

  render() {
    const product = this.props.currentProduct
    return (
      <div>
        <h1>{product.name}</h1>
        <span />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentProduct: state.product.currentProduct
})

const mapDispatchToProps = dispatch => ({
  setProduct: fetchSingleProduct()
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
