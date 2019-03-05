import {addCategoryThunk, fetchCategories} from '../store/category.js'
import {connect} from 'react-redux'
import {Button, Form, Header, Card, List} from 'semantic-ui-react'
import React, {Component} from 'react'
class AddCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getCategories()
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addCategory(this.state)
    this.setState({
      name: ''
    })
    this.props.getCategories()
  }

  handleChange = event => {
    return this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log(this.props.categories)
    return (
      <div>
        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <Form.Input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Button type="submit">Add Category</Button>
        </Form>
        <Header>Categories:</Header>
        <List>
          {this.props.categories
            ? this.props.categories.map(category => {
                return (
                  <List.Item key={category.id}>
                    <List.Icon name="circle" />
                    <List.Content>{category.name}</List.Content>
                  </List.Item>
                )
              })
            : null}
        </List>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}
const mapDispatchToProps = dispatch => ({
  addCategory: newCategoryInfo => dispatch(addCategoryThunk(newCategoryInfo)),
  getCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)
