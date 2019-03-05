import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, updateAdmin, removeUser} from '../store/userList'
import {Card, Button} from 'semantic-ui-react'

export class Users extends Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    return (
      <Card.Group>
        {this.props.users.map(user => {
          // const year = Number(user.updatedAt.split('T')[0].split('-')[0]) + 1
          return (
            <Card color="green" key={user.id}>
              <Card.Content>
                <Card.Header>
                  {`${user.firstName} ${user.lastName}`}
                </Card.Header>
                <Card.Meta>{!user.isAdmin ? 'User' : 'Admin'}</Card.Meta>
                <Card.Description>Email: {user.email}</Card.Description>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button
                      basic
                      color="teal"
                      onClick={() => {
                        this.props.makeAdmin(user.id)
                        this.props.getUsers()
                      }}
                    >
                      Make Admin
                    </Button>
                    <Button
                      basic
                      color="red"
                      onClick={() => {
                        this.props.deleteUser(user.id)
                        this.props.getUsers()
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Content>
              </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
    )
  }
}

const mapStateToProps = state => ({
  users: state.allUsers
})
const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(fetchUsers()),
  makeAdmin: userId => dispatch(updateAdmin(userId)),
  deleteUser: userId => dispatch(removeUser(userId))
})
export default connect(mapStateToProps, mapDispatchToProps)(Users)
