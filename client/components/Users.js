import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsers'

export class Users extends Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    return <div />
  }
}

const mapStateToProps = state => ({
  users: state.users
})
const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
})
export default connect(mapStateToProps, mapDispatchToProps)(Users)
