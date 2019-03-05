import React, {Component} from 'react'
import {addProductThunk} from '../store/product.js'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {Form, Grid, Card, Button} from 'semantic-ui-react'
class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      size: '',
      flavor: '',
      description: '',
      inventory: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addProduct(this.state)
    this.setState({
      name: '',
      price: 0,
      size: '',
      flavor: '',
      description: '',
      inventory: 0,
      availability: false
    })
    this.props.getProducts()
  }

  handleChange = event => {
    return this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Grid columns={1}>
            <Grid.Column>
              <Form.Field>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="size">Size:</label>
                <input
                  type="text"
                  name="size"
                  id="size"
                  value={this.state.size}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="inventory">Inventory:</label>
                <input
                  type="number"
                  min="0"
                  name="inventory"
                  id="inventory"
                  value={this.state.inventory}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <br />
              <Form.Field>
                <label>
                  <input type="radio" value="true" />
                  Available
                </label>
                <label>
                  <input type="radio" value="false" />
                  Unavailable
                </label>
              </Form.Field>
              <br />
              <Button type="submit">Add Product</Button>
            </Grid.Column>
          </Grid>
        </Form>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addProduct: newProductInfo => dispatch(addProductThunk(newProductInfo)),
  getProducts: () => dispatch(fetchProducts())
})

export default connect(null, mapDispatchToProps)(AddProduct)
