import React from 'react'
import {Grid, Card, Feed, Button, Image} from 'semantic-ui-react'

const OrderRow = props => {
  console.log(props.order)
  return (
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
  )
}

export default OrderRow
