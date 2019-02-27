import React, {Component} from 'react'
import {fetchProducts} from '../store/product'
import {fetchCategories} from '../store/category'
import {connect} from 'react-redux'
import Product from './Product'

export class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }

  render() {
    const {products} = this.props
    const {categories} = this.props
    if (!products) {
      return <h1>nope</h1>
    } else
      return (
        <div>
          <div>
            <h1>Product List!</h1>
            <select type="text" name="filterByCategory">
              {!categories ? (
                <p>no categories</p>
              ) : (
                categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>
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
      )
  }
}

const mapStateToProps = state => ({
  products: state.allProducts,
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
