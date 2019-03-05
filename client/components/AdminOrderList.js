import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid} from 'semantic-ui-react'
import OrderRow from './OrderRow'
import {fetchAdminOrders} from '../store/order'

//we want a list of every order by the user
//we want it to have

export class UserOrderList extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    //call fetch orders
    this.props.getOrders()
  }

  render() {
    const orders = this.props.allOrders
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
  allOrders: state.adminOrderList
})

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(fetchAdminOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderList)
