import React, {Component} from 'react'
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

export class UserOrderList extends Component {
  componentDidMount() {
    //call fetch orders
  }

  render() {
    return (
      <div>
        <Grid columns={1} padded>
          <Grid.Column>
            <h1>User Orders List Here</h1>
          </Grid.Column>
        </Grid>

        <div>
          <Card color="pink" fluid>
            <Card.Content>
              <Grid columns={5}>
                <Grid.Row>
                  <Grid.Column>
                    {/* <Image
                      src={item.product.imgUrl}
                      circular
                      size="small"
                    /> */}
                  </Grid.Column>
                  <Grid.Column>
                    {/* <Card.Header>{item.product.name}</Card.Header> */}
                    <Feed>
                      <Feed.Content>
                        <Card.Meta>
                          {/* {item.product.description} */}
                        </Card.Meta>
                      </Feed.Content>
                    </Feed>
                  </Grid.Column>
                  <Grid.Column>
                    {/* <Card.Content>{item.quantity}</Card.Content> */}
                  </Grid.Column>
                  <Grid.Column>
                    <Card.Content>
                      {/* {`$${(item.product.price * item.quantity).toFixed(
                        2
                      )}`} */}
                    </Card.Content>
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                    // onClick={() => this.props.deleteCartItem(item)}
                    >
                      Remove
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        </div>
      </div>
    )
  }
}

export default UserOrderList
