import React from 'react'

export const SingleUserOrder = props => {
  return (
    <div>
      Your User Order Here
      <div key={item.id}>
        <Card color="pink" fluid key={item.id}>
          <Card.Content>
            <Grid columns={5}>
              <Grid.Row>
                <Grid.Column>
                  <Image src={item.product.imgUrl} circular size="small" />
                </Grid.Column>
                <Grid.Column>
                  <Card.Header>{item.product.name}</Card.Header>
                  <Feed>
                    <Feed.Content>
                      <Card.Meta>{item.product.description}</Card.Meta>
                    </Feed.Content>
                  </Feed>
                </Grid.Column>
                <Grid.Column>
                  <Card.Content>{item.quantity}</Card.Content>
                  <Form>
                    <Form.Dropdown
                      placeholder="Update Quantity"
                      selection
                      options={quantityOptions}
                      name="quantity"
                      value={qty}
                      onChange={this.handleChange}
                    />
                    {/* <Input
                                type="text"
                                name="quantity"
                                value={item.quantity}
                                onChange={this.handleChange}

                              /> */}
                    <Button
                      onClick={() =>
                        this.props.putItemQty(item, this.state.qty)
                      }
                    >
                      Update
                    </Button>
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <Card.Content>
                    {`$${(item.product.price * item.quantity).toFixed(2)}`}
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

export default SingleUserOrder
