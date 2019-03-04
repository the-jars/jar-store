import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Card,
  Feed,
  Grid,
  Image,
  Table,
  Dropdown,
  Header,
  Button,
  Form,
  Input
} from 'semantic-ui-react'
import OrderRow from './OrderRow'

//we want a list of every order by the user
//we want it to have

export class UserOrderList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //call fetch orders
  }

  render() {
    const orders = this.props.userOrders
    console.log('orders', orders)
    return !orders || !orders.length ? (
      <h1>No Orders</h1>
    ) : (
      <div>
        <Grid columns={1} padded>
          <Grid.Column>
            <h1>Your Orders</h1>
          </Grid.Column>
        </Grid>
        {orders.map(order => <OrderRow key={order.id} order={order} />)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userOrders: state.UserOrderList
})

export default connect(mapStateToProps)(UserOrderList)
