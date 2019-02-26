import React, {Component} from 'react'
import {connect} from 'react-redux'

// ACTIONS
import {fetchSingleProduct} from '../store/product.js'

class SingleProduct extends Component {
  componentDidMount() {
    const currentProductId = this.props.match.params.id
    console.log(currentProductId)
    this.props.setProduct(currentProductId)
  }

  render() {
    const product = this.props.currentProduct
    const categories = product.categories || []
    console.log(product)
    if (!product) {
      return <h1>Product Not Found</h1>
    } else {
      return (
        <div>
          <h1>{product.name}</h1>
          <h2>
            ${product.available === false
              ? 'Currently Unavailable'
              : product.price}
          </h2>
          <ul>
            {categories.map(category => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
          <p>{product.description}</p>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  currentProduct: state.product.currentProduct
})

const mapDispatchToProps = dispatch => ({
  setProduct: currentProductId => dispatch(fetchSingleProduct(currentProductId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
