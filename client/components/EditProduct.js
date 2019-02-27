import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, editSingleProduct} from '../store/product'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.name = React.createRef()
    this.price = React.createRef()
    this.size = React.createRef()
    this.flavor = React.createRef()
    this.description = React.createRef()
    this.inventory = React.createRef()
  }

  componentDidMount() {
    /**
     * initializes project with the corresponding id provided in the url
     * *****
     * TODO:
     * - prevent re-render when state is already set correctly or updaated correctly
     */
    this.props.initializeProduct()
  }

  // allows default values to render correctly
  componentDidUpdate(prevProps) {
    if (prevProps.productToEdit.id !== this.props.productToEdit.id) {
      const {productToEdit} = this.props
      this.name.current.value = productToEdit.name
      this.price.current.value = productToEdit.price
      this.size.current.value = productToEdit.size
      this.flavor.current.value = productToEdit.flavor
      this.description.current.value = productToEdit.description
      this.inventory.current.value = productToEdit.inventory
    }
  }

  // update all fields except availability
  handleSubmit(evt) {
    // prevent refresh
    evt.preventDefault()
    const {name, price, size, flavor, description, inventory} = evt.target
  }

  toggleAvailability() {}

  render() {
    const productToEdit = this.props.productToEdit
    return (
      <div>
        <h3>{`Edit ${productToEdit.name}`}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" ref={this.name} />
          <label htmlFor="price">Price:</label>
          <input type="text" name="price" id="price" ref={this.price} />
          <label htmlFor="size">Size:</label>
          <input type="text" name="size" id="size" ref={this.size} />
          <label htmlFor="flavor">Flavor:</label>
          <input type="text" name="flavor" id="flavor" ref={this.flavor} />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            ref={this.description}
          />
          <label htmlFor="inventory">Inventory:</label>
          <input
            type="number"
            min="0"
            name="inventory"
            id="inventory"
            ref={this.inventory}
          />
          <button type="submit">Edit Product</button>
        </form>
        <label htmlFor="availability">Availability:</label>
        <button
          type="button"
          name="availability"
          id="availability"
          onClick={this.toggleAvailability}
        >
          {productToEdit.availability}
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  productToEdit: state.singleProduct
})

const mapDispatch = (dispatch, ownProps) => ({
  initializeProduct: () =>
    dispatch(fetchSingleProduct(ownProps.match.params.id)),
  editProduct: editField => dispatch(editSingleProduct(editField))
})

export default connect(mapState, mapDispatch)(EditProduct)
