import React, {Component} from 'react'
import {fetchProducts} from '../store/product.js'

export class ProductList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        <h1>Product List!</h1>
        <ul>
          {this.props.products && this.props.products.length
            ? props.products.map(product => (
                <Product key={product.id} product={product} />
              ))
            : `You're in a jam - there's nothing in stock.`}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
