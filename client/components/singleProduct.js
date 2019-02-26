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
        <h2>
          ${product.status === false ? 'Currently Unavailable' : product.price}
        </h2>
        <ul>
          {product.categories.map(category => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
        <p>{product.description}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentProduct: state.product.currentProduct
})

const mapDispatchToProps = dispatch => ({
  setProduct: currentProductId => dispatch(fetchSingleProduct(currentProductId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
