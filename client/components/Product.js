import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Image, Grid} from 'semantic-ui-react'

export const Product = props => {
  const product = props.product
  return (
    <div>
      <Card>
        <Image src={product.imgUrl} circular fluid />
        <Card.Content>
          <Card.Header>
            <Link to={`products/${product.id}`}>{product.name}</Link>
          </Card.Header>
        </Card.Content>
      </Card>
    </div>
  )
}

export default Product
