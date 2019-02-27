import React, {Component} from 'react'
import {fetchProducts} from '../store/product.js'
import {connect} from 'react-redux'
import Product from './Product'

export class ProductList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products
    console.log(this.props.user)
    return (
      <div>
        {!products ? (
          <h1>nope</h1>
        ) : (
          <div>
            <h1>Product List!</h1>
            <div className="grid-container">
              {products.map(product => (
                <Product
                  key={product.id}
                  className="grid-item"
                  product={product}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.allProducts,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
