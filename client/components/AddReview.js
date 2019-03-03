import React, {Component} from 'react'
import {Rating, Button, Grid, TextArea, Form} from 'semantic-ui-react'
import {addNewReview, showAddReview} from '../store/review'
import {connect} from 'react-redux'

export class AddReview extends Component {
  constructor() {
    super()
    this.state = {
      rating: 1,
      maxRating: 5,
      reviewText: ''
    }
    this.handleRate = this.handleRate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleRate = (e, {rating, maxRating}) => this.setState({rating, maxRating})
  handleChange = (e, {name, value}) => this.setState({[name]: value})
  handleSubmit = e => {
    e.preventDefault()
    this.props.addNewReview(
      this.state,
      this.props.product.id,
      this.props.user.id
    )
    this.props.showAddReviewFunc()
    this.setState({
      reviewText: ''
    })
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column>
            <Form onSubmit={this.handleSubmit}>
              <TextArea
                placeholder="Tell us more"
                name="reviewText"
                value={this.state.ratingText}
                onChange={this.handleChange}
              />
              <Rating maxRating={5} onRate={this.handleRate} content="Submit" />
              <Button>Submit Review</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  addNewReview: (reviewData, productId, userId) =>
    dispatch(addNewReview(reviewData, productId, userId)),
  showAddReviewFunc: () => dispatch(showAddReview())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddReview)
