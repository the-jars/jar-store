import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, fetchNewProductCategory} from '../store/product'
import {categories} from '../store/category'
import {Button, Form} from 'semantic-ui-react'

class AddProductCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: 0,
      productId: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleNewPC = this.handleNewPC.bind(this)
  }
  handleNewPC() {
    this.props.fetchNewProductCategory(
      this.state.categoryId,
      this.state.productId
    )
  }
  handleChange = event => {
    return this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleNewPC}>
        <Form.Input
          type="text"
          name="categoryId"
          label="categoryId"
          id="categoryId"
          value={this.state.categoryId}
          onChange={this.handleChange}
        />

        <Form.Input
          type="text"
          name="productId"
          label="productId"
          id="productId"
          value={this.state.productId}
          onChange={this.handleChange}
        />
        <Button type="submit">Add New ProductCategory</Button>
      </Form>
    )
  }
}

const mapState = state => ({
  singleProduct: state.singleProduct,
  categories: state.singleProduct.categories
  // handleNewPC: state.handleNewPC
})

const mapDispatch = (dispatch, ownProps) => ({
  initializeProduct: () =>
    dispatch(fetchSingleProduct(ownProps.match.params.id)),
  editProduct: editField =>
    dispatch(editSingleProduct(ownProps.match.params.id, editField)),
  fetchNewProductCategory: (categoryId, productId) =>
    dispatch(fetchNewProductCategory(categoryId, productId))
})

export default connect(mapState, mapDispatch)(AddProductCategory)
