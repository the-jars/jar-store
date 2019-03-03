import {addCategoryThunk, fetchCategories} from '../store/category.js'
import {connect} from 'react-redux'
import {Button, Form} from 'semantic-ui-react'
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

  handleSubmit = event => {
    event.preventDefault()
    this.props.addCategory(this.state)
    this.setState({
      name: ''
    })
    this.props.getCategories()
  }

  handleChange = event => {
    console.log(this.state)
    return this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
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
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addCategory: newCategoryInfo => dispatch(addCategoryThunk(newCategoryInfo)),
  getCategories: () => dispatch(fetchCategories())
})

export default connect(null, mapDispatchToProps)(AddCategory)
