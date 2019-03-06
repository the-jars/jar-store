import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Image, Grid} from 'semantic-ui-react'
import AddItemToCart from './AddItemToCart'

export const Product = props => {
  const product = props.product
  const user = props.user
  return (
    <div>
      <Card>
        <Image src={product.imgUrl} circular verticalAlign="top" />
        <Card.Content>
          <Card.Header>
            <Link to={`products/${product.id}`}>{product.name}</Link>
          </Card.Header>
          <Card.Meta>{product.description}</Card.Meta>
          <AddItemToCart productId={product.id} userId={user.id} />
        </Card.Content>
      </Card>
    </div>
  )
}

export default Product
