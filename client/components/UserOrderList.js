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

//we want a list of every order by the user
//we want it to have

export class UserOrderList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //call fetch orders
  }

  render() {
    return (
      <div>
        <Grid columns={1} padded>
          <Grid.Column>
            <h1>Your Orders</h1>
          </Grid.Column>
        </Grid>
        <div>
          <Card color="pink" fluid>
            <Card.Content>
              <Grid columns={5}>
                <Grid.Row>
                  <Grid.Column>
                    <Image src="/images/raspberry.png" circular size="small" />
                  </Grid.Column>
                  <Grid.Column>
                    <Card.Header>date: june 11 2017 4 pm</Card.Header>
                    <Feed>
                      <Feed.Content>
                        <Card.Meta>
                          items: strawberry jelly, peach salsa, and more
                        </Card.Meta>
                      </Feed.Content>
                    </Feed>
                  </Grid.Column>
                  <Grid.Column>
                    <Card.Content>cost: $10</Card.Content>
                  </Grid.Column>
                  <Grid.Column>
                    <Card.Header>status: processed</Card.Header>
                    <Feed>
                      <Feed.Content>
                        <Card.Meta>click here for more info</Card.Meta>
                      </Feed.Content>
                    </Feed>
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                    // onClick={() => this.props.deleteCartItem(item)}
                    >
                      Details
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
