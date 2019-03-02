import React from 'react'
import {Button} from 'semantic-ui-react'

const AddItemButton = props => {
  const handleClick = event => {
    //TODO call AddItem to Cart thunk (did Steffeni already do this?)
  }

  return <Button onClick={handleClick}>Add To Cart</Button>
}
