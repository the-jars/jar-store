import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Dropdown, Button} from 'semantic-ui-react'
import OrderRow from './OrderRow'
import {fetchAdminOrders, filterAdminOrders} from '../store/order'
import queryString from 'query-string'

//we want a list of every order by the user
//we want it to have

export class UserOrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: 'All'
    }
  }

  componentDidMount() {
    // parses the passed-in query parameters as JavaScript object and grab the filter type
    const filter = queryString.parse(this.props.location.search).status
    filter ? this.props.applyFilter(status) : this.props.getOrders()
  }

  handleChange = (event, {value}) => {
    this.setState({
      filter: value
    })
  }

  render() {
    //status options
    const statusOptions = [
      'All',
      'Canceled',
      'Delivered',
      'Processing',
      'Shipped'
    ].map((option, idx) => {
      return {key: idx, text: option, value: option}
    })

    const orders = this.props.adminOrderList
    console.log(this.props)
    return !orders || !orders.length ? (
      <h1>No Orders</h1>
    ) : (
      <div>
        <Dropdown
          // type="text"
          name="filterByStatus"
          placeholder="All"
          selection
          value={this.state.filter}
          onChange={this.handleChange}
          options={statusOptions}
        />
        <Button
          onClick={() => {
            this.props.applyFilter(this.state.filter)
            this.props.history.push(`/admin/orders?status=${this.state.filter}`)
          }}
        >
          Filter
        </Button>
        <Grid columns={1} padded>
          <Grid.Column>
            <h1>Your Orders</h1>
          </Grid.Column>
        </Grid>
        {orders && orders.length
          ? orders.map(order => <OrderRow key={order.id} order={order} />)
          : 'nah'}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  adminOrderList: state.adminOrderList
})

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(fetchAdminOrders()),
  applyFilter: filter => dispatch(filterAdminOrders(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderList)
