import {Menu, Sidebar} from 'semantic-ui-react'
import React from 'react'
import {NavLink, Link} from 'react-router-dom'

const sidebar = props => (
  <div>
    <Menu width="wide" visible="true" vertical>
      <Menu.Header>Products</Menu.Header>
      <Menu.Item
        as={NavLink}
        to="/products?filter=Jellies,%20Jams,%20Preserves"
      >
        Jams & Jellies
      </Menu.Item>
      <Menu.Item as={Link} to="/products?filter=Salsas">
        Salsas
      </Menu.Item>
      <Menu.Item as={Link} to="/products?filter=Nut%20Butters">
        Nut Butters
      </Menu.Item>
    </Menu>
  </div>
)

export default sidebar
