import React from 'react'

export const Product = props => {
  const product = props.product
  return (
    <div>
      <img src={product.imgUrl} alt="we still need an imageurl category" />
      <h2>{product.name}</h2>
      {/* name should link to singleproduct page route */}
    </div>
  )
}

export default Product
