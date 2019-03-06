import React from 'react'
import {Grid, Card, Feed, Button, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const OrderRow = props => {
  const firstItem =
    props.order.orderProducts && props.order.orderProducts.length
      ? props.order.orderProducts[0].product
      : ''
  const order = props.order
  const origDate = Date.parse(order.createdAt)
  const dateStr = new Date(origDate).toDateString()
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
                <Card.Header>{dateStr}</Card.Header>
                <Card.Meta>Order #{order.id}</Card.Meta>
                <Feed>
                  <Feed.Content>
                    <Card.Meta>
                      Items:
                      <ul>
                        {order.orderProducts &&
                          order.orderProducts.map((orderProduct, i) => (
                            <li key={i}>
                              <Link to={`/products/${orderProduct.product.id}`}>
                                {orderProduct.product.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </Card.Meta>
                  </Feed.Content>
                </Feed>
              </Grid.Column>
              <Grid.Column>
                <Card.Content>
                  {/* totalCost */}
                  Total: $55
                </Card.Content>
              </Grid.Column>
              <Grid.Column>
                <Card.Header>Status: {order.shippingStatus}</Card.Header>
                {order.shippingStatus === 'Processing' ? (
                  <Card.Meta>Expected in 5-6 business days.</Card.Meta>
                ) : (
                  ''
                )}
              </Grid.Column>
              <Grid.Column>
                <Button>
                  <Link to={`/myorders/${order.id}`}>
                    click here for more info
                  </Link>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </div>
  )
}

export default OrderRow
