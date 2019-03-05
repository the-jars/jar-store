import React from 'react'
import {connect} from 'react-redux'
import {addProductToCategory} from '../store/product'
import {fetchCategories} from '../store/category'
import {Button, Form} from 'semantic-ui-react'

class AddProductCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleNewPC = this.handleNewPC.bind(this)
  }
  handleNewPC() {
    this.props.addProductToCategory(
      this.state.category.id,
      this.props.product.id
    )
  }
  handleChange = (event, {value}) => {
    return this.setState({
      category: value
    })
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const categories = this.props.categories.length
      ? this.props.categories.map(category => {
          return {key: category.id, text: category.name, value: category}
        })
      : []
    const category = this.state.category
    return (
      <Form onSubmit={this.handleNewPC}>
        <Form.Dropdown
          placeholder="Assign Category"
          selection
          options={categories}
          name="category"
          value={category}
          onChange={this.handleChange}
        />
        <Button type="submit">Assign Category</Button>
      </Form>
    )
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatch = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  addProductToCategory: (categoryId, productId) =>
    dispatch(addProductToCategory(categoryId, productId))
})

export default connect(mapStateToProps, mapDispatch)(AddProductCategory)
