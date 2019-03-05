import {fetchSingleOrder} from '../store/order'
import {connect} from 'react-redux'

import {
  Card,
  Feed,
  Grid,
  Image,
  Table,
  Dropdown,
  Label,
  Divider,
  Segment,
  Link,
  Header,
  Button,
  Form,
  Input
} from 'semantic-ui-react'

import React, {Component} from 'react'

export class SingleUserOrder extends Component {
  componentDidMount() {
    this.props.fetchSingleOrder(this.props.match.params.orderId)
  }
  render() {
    const order = this.props.currentOrder
    const items = this.props.currentOrder.orderProducts
    const origDate = Date.parse(order.createdAt)
    const dateStr = new Date(origDate).toDateString()
    console.log('items', items)
    return (
      <div>
        <Header as="h1" padded>
          <br />
          Your Order on {dateStr}
          <br />
          <br />
        </Header>
        <div>
          <Grid columns={4} padded>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">Order Status:</Header>
                {order.shippingStatus != 'Processing'
                  ? `${order.shippingStatus}`
                  : `Processing - expected in 5-6 business days.`}
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">Shipping Address:</Header>
                Your name
                <br />123 Evergreen Terrace
                <br />Springfield, IL
                <br />60640
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">Payment Method:</Header>
                Visa ending in 1234
                <br />
                <Header as="h3">Order Number:</Header>
                {order.id}
              </Grid.Column>
              <Card centered>
                <Table basic="very" celled collapsing>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Header>
                          <Header.Content>Items</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>5</Table.Cell>
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
                      <Table.Cell>$Tax</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Header>
                          <Header.Content>Total</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>Total</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Button>Track / Cancel</Button>
              </Card>
            </Grid.Row>
          </Grid>

          <Header as="h2">Your Order Included 1 Item:</Header>
          {console.log(items)}

          {!items
            ? 'nah'
            : items.map(item => {
                return (
                  <Card color="pink" fluid>
                    <Card.Content>
                      <Grid columns={5} padded>
                        <Grid.Row>
                          <Grid.Column>
                            <Image
                              src={item.product.imgUrl}
                              circular
                              size="small"
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Card.Header>
                              {item.product.name}
                              {/* <Link
                                to={`products/${item.product.id}`}
                                currentProduct={item}
                              >
                                {item.product.name}
                              </Link> */}
                            </Card.Header>
                            <Feed>
                              <Feed.Content>
                                <Card.Meta>
                                  {item.product.description}
                                </Card.Meta>
                              </Feed.Content>
                            </Feed>
                          </Grid.Column>
                          <Grid.Column>
                            <Card.Content>
                              Quantity: {item.quantity}
                            </Card.Content>
                          </Grid.Column>
                          <Grid.Column>
                            <Card.Content>
                              Total: product price at time of order *
                              {item.quantity}
                            </Card.Content>
                          </Grid.Column>
                          <Grid.Column>
                            <Button
                            // onClick={() => this.props.deleteCartItem(item)}
                            >
                              Review Now
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Card.Content>
                  </Card>
                )
              })}
        </div>{' '}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentOrder: state.currentOrder,
  items: state.currentOrder.orderProducts
})

const mapDispatchToProps = dispatch => ({
  // const orderId = ownProps.match.params.orderId
  fetchSingleOrder: orderId => dispatch(fetchSingleOrder(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserOrder)
