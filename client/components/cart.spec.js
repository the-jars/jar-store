import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Cart} from './Cart'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart', () => {
  let cartItem
  const cart = [
    {
      id: 3,
      product: {
        inventory: 2,
        imgUrl: null,
        name: 'CODYS BEST JAM',
        description: 'pretty good'
      },
      quantity: 3,
      price: 30.44
    }
  ]

  beforeEach(() => {
    cartItem = shallow(<Cart cart={cart} />)
  })

  it('renders the product name in a header', () => {
    expect(cartItem.find('.header').text()).to.be.equal('CODYS BEST JAM')
  })
})
