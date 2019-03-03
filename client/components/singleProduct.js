import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {showAddReview} from '../store/review'
import {Image, Card} from 'semantic-ui-react'

// ACTIONS
import {fetchSingleProduct} from '../store/product.js'
import {Button} from 'semantic-ui-react'
import AddReview from './Review.js'

class SingleProduct extends Component {
  constructor() {
    super()
  }
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
        <div style={{textAlign: 'center', justifySelf: 'center'}}>
          <Card>
            <h1>{product.name}</h1>
            <Image src={product.imgUrl} circular />
            <h2>
              {product.available === false
                ? 'Currently Unavailable'
                : `$${product.price}`}
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
            <Button onClick={this.props.showAddReviewFunc}>Add a Review</Button>
            {this.props.showAddReview ? <AddReview product={product} /> : null}
          </Card>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  currentProduct: state.singleProduct,
  user: state.user,
  showAddReview: state.reviews.showAddReview
})

const mapDispatchToProps = dispatch => ({
  setProduct: currentProductId =>
    dispatch(fetchSingleProduct(currentProductId)),
  showAddReviewFunc: () => dispatch(showAddReview())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
