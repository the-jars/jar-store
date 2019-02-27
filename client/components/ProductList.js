import React, {Component} from 'react'
import {fetchProducts, filterCategories} from '../store/product'
import {fetchCategories} from '../store/category'
import {connect} from 'react-redux'
import Product from './Product'

export class ProductList extends Component {
  // constructor() {
  //   super()
  //   this.handleChange = this.handleChange.bind(this)
  // }

  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }

  handleChange = event => {
    const filter = event.target.value
    history.push(`/products/${filter}`)
    this.props.applyFilter(filter)
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
            <select
              type="text"
              name="filterByCategory"
              onChange={this.handleChange}
            >
              <option selected value="all">
                All
              </option>
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
  fetchCategories: () => dispatch(fetchCategories()),
  applyFilter: filter => dispatch(filterCategories(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
