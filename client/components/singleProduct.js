import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// ACTIONS
import {fetchSingleProduct} from '../store/product.js'

class SingleProduct extends Component {
  componentDidMount() {
    const currentProductId = this.props.match.params.id
    this.props.setProduct(currentProductId)
  }

  render() {
    const product = this.props.currentProduct
    const categories = product.categories || []
    const user = this.props.user
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
          <div>
            {user.id && user.isAdmin ? (
              <Link to={`/products/${product.id}/edit`}>
                <button type="button">Edit Product</button>
              </Link>
            ) : null}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  currentProduct: state.singleProduct,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  setProduct: currentProductId => dispatch(fetchSingleProduct(currentProductId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
