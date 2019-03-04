import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {showAddReview, getReviews} from '../store/review'
import {Image, Card, Icon, Segment, Header, Grid} from 'semantic-ui-react'
import Review from './Review'

// ACTIONS
import {fetchSingleProduct} from '../store/product.js'
import {Button} from 'semantic-ui-react'
import AddReview from './AddReview.js'

class SingleProduct extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    const currentProductId = this.props.match.params.id
    this.props.setProduct(currentProductId)
    this.props.getReviews(currentProductId)
  }

  // eslint-disable-next-line complexity
  render() {
    const product = this.props.currentProduct
    const categories = product.categories || []
    const user = this.props.user
    const totalRating = this.props.reviews.length
      ? this.props.reviews.reduce((acc, cv) => {
          acc += cv.rating
          return acc
        }, 0) / this.props.reviews.length.toFixed(2)
      : 'No reviews yet!'
    if (!product) {
      return <h1>Product Not Found</h1>
    } else {
      return (
        <div>
          <Grid columns={3}>
            <Grid.Column>
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
                <Card.Meta>Average Rating: {totalRating}</Card.Meta>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Header as="h3" dividing>
                  Reviews
                </Header>
                {this.props.reviews.length
                  ? this.props.reviews.map(review => {
                      return (
                        <Review
                          key={review.id}
                          user={this.props.user}
                          review={review}
                        />
                      )
                    })
                  : 'No reviews yet!'}
              </Card>
            </Grid.Column>
            <Grid.Column>
              {user.id ? (
                <Button onClick={this.props.showAddReviewFunc}>
                  Add a Review
                </Button>
              ) : (
                <h1>
                  Want to leave a review? Please <Link to="/login">login</Link>{' '}
                  or <Link to="/signup">sign up!</Link>{' '}
                </h1>
              )}
              {this.props.showAddReview ? (
                <AddReview product={product} />
              ) : null}
              <br />
              <br />
              {user.id && user.isAdmin ? (
                <Link to={`/products/${product.id}/edit`}>
                  <Button type="button">Edit Product</Button>
                </Link>
              ) : null}
            </Grid.Column>
          </Grid>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  currentProduct: state.singleProduct,
  user: state.user,
  showAddReview: state.reviews.showAddReview,
  reviews: state.reviews.reviews
})

const mapDispatchToProps = dispatch => ({
  setProduct: currentProductId =>
    dispatch(fetchSingleProduct(currentProductId)),
  showAddReviewFunc: () => dispatch(showAddReview()),
  getReviews: productId => dispatch(getReviews(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
