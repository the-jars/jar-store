// external modules
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import {
  Menu,
  Sidebar,
  Grid,
  Dropdown,
  Button,
  Segment,
  Card,
  Search,
  Form,
  Input,
  Icon,
  Card
} from 'semantic-ui-react'

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
      productsPerPage: 30,
      filter: 'All',
      searchValue: '',
      products: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleChange = (event, {value}) => {
    this.setState({
      filter: value
    })
    this.props.applyFilter(this.state.filter)
  }

  handleSubmit(event) {
    event.preventDefault()
    const filteredProducts = this.props.products.filter(product => {
      return (
        product.name
          .toLowerCase()
          .includes(event.target.search.value.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(event.target.search.value.toLowerCase())
      )
    })
    this.setState({
      products: filteredProducts
    })
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
    //category options
    const categoryOptions = categories.map((category, idx) => {
      return {key: idx, text: category.name, value: category.name}
    })
    categoryOptions.push({key: 10, text: 'All', value: 'All'})
    const productsToMap = this.state.products.length
      ? this.state.products
      : currentProducts
    if (!products) {
      return <h1>nope</h1>
    } else
      return (
        <div>
          <div>
            <h1>Product List!</h1>
            <div>
              <Dropdown
                // type="text"
                name="filterByCategory"
                placeholder="All"
                selection
                value={this.state.filter}
                onChange={this.handleChange}
                options={categoryOptions}
              >
                {/* <option value="All">All</option>
                {!categories
                  ? ''
                  : categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))} */}
              </Dropdown>
              <Button
                onClick={() => {
                  this.props.applyFilter(this.state.filter)
                  this.props.history.push(
                    `/products?filter=${this.state.filter}`
                  )
                }}
              >
                Filter
              </Button>
              {user.id && user.isAdmin ? (
                <Link to="/products/add">
                  <Button type="button">Add Product</Button>
                </Link>
              ) : null}
              {user.id && user.isAdmin ? (
                <Link to="/categories/add">
                  <Button type="button">Add Category</Button>
                </Link>
              ) : null}
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  //onChange={this.handleChangeSearch}
                  placeholder="Search"
                  type="text"
                  name="search"
                />
                <Button>
                  <Icon name="search" />{' '}
                </Button>
              </Form>
                <Link to="/category/add">
                  <Button type="button">Add Category</Button>
                </Link>
              ) : null}
            </div>
          </div>
          <br />
          <div>
            <Grid>
              {/* <Grid.Column> */}
              {productsToMap.map(
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
              {/* </Grid.Column> */}
            </Grid>
          </div>
          <br />

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
  products: state.allProducts,
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCategories: () => dispatch(fetchCategories()),
  applyFilter: filter => dispatch(filterCategories(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
