import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu} from 'semantic-ui-react'

// const Navbar = ({handleClick, isLoggedIn}) => (
class Navbar extends React.Component {
  // constructor({handleClick, isLoggedIn}) {
  //   super({handleClick, isLoggedIn})
  //   this.state = {activeItem: 'home'}
  // }
  constructor(props) {
    super(props)
    this.state = {activeItem: 'home'}
  }
  handleItemClick = (e, {name}) => this.setState({activeItem: name})
  render() {
    return (
      <div>
        <h1>THE JARS</h1>
        {this.props.isLoggedIn ? (
          <div>
            <Menu secondary>
              {/* The navbar will show these links after you log in */}
              <Menu.Item
                name="home"
                active={this.props.activeItem === 'home'}
                onClick={this.handleItemClick}
              >
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Menu.Item
                name="logout"
                active={this.props.activeItem === 'logout'}
                onClick={this.handleItemClick}
              >
                <Link to="/login" onClick={this.props.handleClick}>
                  Logout
                </Link>
              </Menu.Item>
              <Menu.Item
                name="products"
                active={this.props.activeItem === 'products'}
                onClick={this.handleItemClick}
              >
                <Link to="/products">Jars!</Link>
              </Menu.Item>
              <Menu.Item
                name="cart"
                active={this.props.activeItem === 'cart'}
                onClick={this.handleItemClick}
              >
                <Link to="/cart">Cart</Link>
              </Menu.Item>
            </Menu>
          </div>
        ) : (
          <div>
            <Menu secondary>
              {/* The navbar will show these links before you log in */}
              <Menu.Item
                name="home"
                active={this.props.activeItem === 'home'}
                onClick={this.handleItemClick}
              >
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item
                name="home"
                active={this.props.activeItem === 'home'}
                onClick={this.handleItemClick}
              >
                <Link to="/signup">Sign Up</Link>
              </Menu.Item>
              <Menu.Item
                name="home"
                active={this.props.activeItem === 'home'}
                onClick={this.handleItemClick}
              >
                <Link to="/products">Jars!</Link>
              </Menu.Item>
            </Menu>
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
