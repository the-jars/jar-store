import React, {Component} from 'react'
import {fetchProducts, filterCategories} from '../store/product'
import {fetchCategories} from '../store/category'
import {connect} from 'react-redux'
import Product from './Product'
import {Link} from 'react-router-dom'

export class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }

  handleChange = event => {
    const filter = event.target.value
    this.props.applyFilter(filter)
  }

  render() {
    const {products} = this.props
    const {categories} = this.props
    const {user} = this.props
    if (!products) {
      return <h1>nope</h1>
    } else
      return (
        <div>
          <div>
            <h1>Product List!</h1>
            <select
              type="text"
              name="filterByCategory"
              defaultValue="All"
              onChange={this.handleChange}
            >
              <option value="All">All</option>
              {!categories
                ? ''
                : categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
            </select>
          </div>
          <div className="grid-container">
            {products.map(
              product =>
                product.available ? (
                  <Product
                    key={product.id}
                    className="grid-item"
                    product={product}
                  />
                ) : (
                  ''
                )
            )}
          </div>
          <br />
          <div>
            {user.id && user.isAdmin ? (
              <Link to="/products/add">
                <button type="button">Add Product</button>
              </Link>
            ) : null}
          </div>
        </div>
      )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.allProducts,
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCategories: () => dispatch(fetchCategories()),
  applyFilter: filter => dispatch(filterCategories(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
