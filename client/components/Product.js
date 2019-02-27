import React from 'react'
import {Link} from 'react-router-dom'

export const Product = props => {
  const product = props.product
  return (
    <div>
      <img src={product.imgUrl} alt="something's broken" />
      <h3>
        <Link to={`products/${product.id}`}>{product.name}</Link>
      </h3>
    </div>
  )
}

export default Product
