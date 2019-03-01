import React, {Component} from 'react'
import {fetchCartItems, deleteCartItem, putItemQty} from '../store/cart'
import {connect} from 'react-redux'
import {
  Card,
  Feed,
  Grid,
  Image,
  Table,
  Dropdown,
  Header,
  Button,
  Form,
  Input
} from 'semantic-ui-react'

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      qty: 0,
      currentItem: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  total(cartData) {
    return cartData.reduce((acc, item) => {
      acc += item.quantity * item.product.price
      return acc
    }, 0)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.putItemQty(this.state.currentItem, event.target.name.value)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const cart = this.props.cart || []
    const itemTotal = this.total(cart)
    const tax = itemTotal * 0.1
    const total = itemTotal + 5.95 + tax
    return (
      <div>
        <Grid columns={1} padded>
          <Grid.Column>
            <h1>Your Cart</h1>
            {cart.map(item => {
              const quantityOptions = []
              for (let i = 1; i <= item.product.inventory; i++) {
                quantityOptions.push({key: i, text: `${i}`, value: i})
              }
              return (
                // eslint-disable-next-line react/jsx-key
                <div key={item.id}>
                  <Card color="pink" fluid key={item.id}>
                    <Card.Content>
                      <Grid columns={5}>
                        <Grid.Row>
                          <Grid.Column>
                            <Image
                              src={item.product.imgUrl}
                              circular
                              size="small"
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Card.Header>{item.product.name}</Card.Header>
                            <Feed>
                              <Feed.Content>
                                <Card.Meta>
                                  {item.product.description}
                                </Card.Meta>
                              </Feed.Content>
                            </Feed>
                          </Grid.Column>
                          <Grid.Column>
                            <Form onSubmit={this.handleSubmit}>
                              {/* <Dropdown
                                placeholder={`${item.quantity}`}
                                options={quantityOptions}
                                name="quantity"
                                value={name}
                                onClick={() => this.setState({item: item})}
                                onChange={this.handleChange}
                              /> */}
                              <Input
                                type="text"
                                name="quantity"
                                value={this.state.quantity}
                                onChange={this.handleChange}
                                onClick={() =>
                                  this.setState({currentItem: item})
                                }
                              />
                              <Button type="submit">Update</Button>
                            </Form>
                          </Grid.Column>
                          <Grid.Column>
                            <Card.Content>
                              {`$${(item.product.price * item.quantity).toFixed(
                                2
                              )}`}
                            </Card.Content>
                          </Grid.Column>
                          <Grid.Column>
                            <Button
                              onClick={() => this.props.deleteCartItem(item)}
                            >
                              Remove
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Card.Content>
                  </Card>
                </div>
              )
            })}
          </Grid.Column>
        </Grid>
        <Card centered padded margined>
          <Table basic="very" celled collapsing>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header padded>
                    <Header.Content>Items</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{`$${itemTotal.toFixed(2)}`}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header>
                    <Header.Content>Shipping & Handling</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>$5.95</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header>
                    <Header.Content>Estimated Tax</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{`$${tax.toFixed(2)}`}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header>
                    <Header.Content>Total</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{`$${total}`}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button>Checkout</Button>
        </Card>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  fetchCartItems: userId => dispatch(fetchCartItems(userId)),
  deleteCartItem: itemToDelete => dispatch(deleteCartItem(itemToDelete)),
  putItemQty: editedCartItem => dispatch(putItemQty(editedCartItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
