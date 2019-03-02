// external modules
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import {Menu, Sidebar} from 'semantic-ui-react'

// internal moduels
import {fetchProducts, filterCategories} from '../store/product'
import {fetchCategories} from '../store/category'
import Product from './Product'
import AddItemButton from './AddItemToCart'
import {cart} from '../store/cart'

export class ProductList extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1,
      productsPerPage: 3
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  componentDidMount() {
    // parses the passed-in query parameters as JavaScript object and grab the filter type
    const filter = queryString.parse(this.props.location.search).filter
    filter ? this.props.applyFilter(filter) : this.props.fetchProducts()
    this.props.fetchCategories()
  }

  handleChange = event => {
    const filter = event.target.value
    this.props.applyFilter(filter)
    this.props.history.push(`/products?filter=${filter}`)
  }

  render() {
    const {products} = this.props
    const {categories} = this.props
    const {user} = this.props
    const {currentPage, productsPerPage} = this.state

    // Logic for displaying current todos
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    )

    // Logic for displaying page numbers
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers.push(i)
    }

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
            {currentProducts.map(
              product =>
                product.available ? (
                  <div>
                    <Product
                      key={product.id}
                      className="grid-item"
                      product={product}
                    />
                    <AddItemButton productId={product.id} />
                  </div>
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
          {pageNumbers.map(number => {
            return (
              <button
                type="button"
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {number}
              </button>
            )
          })}
        </div>
      )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.allProducts
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCategories: () => dispatch(fetchCategories()),
  applyFilter: filter => dispatch(filterCategories(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
