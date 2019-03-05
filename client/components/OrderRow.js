import React from 'react'
import {Grid, Card, Feed, Button, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const OrderRow = props => {
  const firstItem = props.order.orderProducts[0].product
  const order = props.order
  return (
    <div>
      <Card color="pink" fluid>
        <Card.Content>
          <Grid columns={5}>
            <Grid.Row>
              <Grid.Column>
                <Image src={firstItem.imgUrl} circular size="small" />
              </Grid.Column>
              <Grid.Column>
                <Card.Header>{order.createdAt}</Card.Header>
                <Feed>
                  <Feed.Content>
                    <Card.Meta>
                      items:{' '}
                      <ul>
                        {order.orderProducts.map((orderProduct, i) => (
                          <li key={i}>{orderProduct.product.name}</li>
                        ))}
                      </ul>
                    </Card.Meta>
                  </Feed.Content>
                </Feed>
              </Grid.Column>
              <Grid.Column>
                <Card.Content>total: $NEED COST STILL</Card.Content>
              </Grid.Column>
              <Grid.Column>
                <Card.Header>status: {order.shippingStatus}</Card.Header>
                <Feed>
                  <Feed.Content>
                    <Card.Meta>click here for shipping info</Card.Meta>
                  </Feed.Content>
                </Feed>
              </Grid.Column>
              <Grid.Column>
                <Button>
                  <Link to={`/myorders/${order.id}`}>
                    click here for more info
                  </Link>
                </Button>

                {/* <Button
                // onClick={() => this.props.deleteCartItem(item)}
                >
                  Details
                </Button> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </div>
  )
}

export default OrderRow
