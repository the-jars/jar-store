import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'semantic-ui-react'

export const Product = props => {
  const product = props.product
  return (
    <Card>
      <div>
        <img src={product.imgUrl} alt="something's broken" />
        <h3>
          <Link to={`products/${product.id}`}>{product.name}</Link>
        </h3>
      </div>
    </Card>
  )
}

export default Product
