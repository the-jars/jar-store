import {Menu, Sidebar} from 'semantic-ui-react'
import React from 'react'

const sidebar = props => (
  <Menu width="wide" visible="true" vertical>
    <Menu.Header>Products</Menu.Header>
    <Menu.Item>Jams & Jellies</Menu.Item>
    <Menu.Item>Nut Butters</Menu.Item>
    <Menu.Item>Salsas</Menu.Item>
  </Menu>
)

export default sidebar
