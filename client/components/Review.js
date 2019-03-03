import React, {Component} from 'react'
import {Rating, Button, Grid, TextArea, Form} from 'semantic-ui-react'
import {addNewReview} from '../store/review'
import {connect} from 'react-redux'

export class Reviews extends Component {
  constructor() {
    super()
    this.state = {
      rating: 1,
      maxRating: 5,
      reviewText: ''
    }
    this.handleChange = this.handleChange.bind(this)
    //this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleRate = (e, {rating, maxRating}) => this.setState({rating, maxRating})
  handleChange = (e, {name, value}) => this.setState({[name]: value})
  handleSubmit = e => {
    this.props.addNewReview(
      this.state,
      this.props.product.id,
      this.props.user.id
    )
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
    addNewReview(reviewData, productId, userId)
})

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
