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
  Header,
  Button,
  Form,
  Input
} from 'semantic-ui-react'

import React, {Component} from 'react'

export class SingleUserOrder extends Component {
  componentDidMount() {
    console.log(this.props.match.params.orderId)
    this.props.fetchSingleOrder(this.props.match.params.orderId)
  }
  render() {
    console.log('order', this.state.currentOrder)
    return (
      <div>
        <Header as="h1" padded>
          <br />
          Your Order on June 11, 2017
          <br />
          <br />
        </Header>
        <div>
          <Grid columns={4} padded>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">Order Status:</Header>
                {/* <Header as="h4"> */}
                Processing
                <br />OR
                <br />On its way!
                <br />Last seen in Miluakee
                <br />Click here for more details
                {/* </Header> */}
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
                xxxx-yyyy-zzzz
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
          {/* <Divider /> */}
          <Header as="h2">Your Order Included 1 Item:</Header>
          <div>
            <Card color="pink" fluid>
              <Card.Content>
                <Grid columns={5} padded>
                  <Grid.Row>
                    <Grid.Column>
                      <Image
                        src="/images/raspberry.png"
                        circular
                        size="small"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Card.Header>Product name</Card.Header>
                      <Feed>
                        <Feed.Content>
                          <Card.Meta>Description</Card.Meta>
                        </Feed.Content>
                      </Feed>
                    </Grid.Column>
                    <Grid.Column>
                      <Card.Content>Quantity: 1</Card.Content>
                    </Grid.Column>
                    <Grid.Column>
                      <Card.Content>
                        product price at time of order * quantity
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
          </div>
        </div>{' '}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentOrder: state.currentOrder
})

const mapDispatchToProps = dispatch => ({
  // const orderId = ownProps.match.params.orderId
  fetchSingleOrder: orderId => dispatch(fetchSingleOrder(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserOrder)
