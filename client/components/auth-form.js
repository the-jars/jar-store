import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="login-form">
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
      <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="screen_shot_2019-02-27_at_3.40.20_pm.png" />{' '}
            {displayName}
          </Header>
          <Form size="large" onSubmit={handleSubmit} name={name}>
            <Segment stacked>
              <Form.Input
                // fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
              />
              <Form.Input
                // fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
              />
              {props.type === 'signup' ? (
                <div>
                  <Form.Input
                    // fluid
                    placeholder="Username"
                    type="text"
                    name="username"
                  />
                  <Form.Input
                    // fluid
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                  />
                  <Form.Input
                    // fluid
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                  />
                </div>
              ) : null}

              <Button color="teal" fluid size="large" type="submit">
                {displayName}
              </Button>
            </Segment>
          </Form>
          {props.type !== 'signup' ? (
            <Message>
              New to us? <Link to="/signup"> Sign Up</Link>
            </Message>
          ) : null}
          <a href="/auth/google">{displayName} with Google</a>
        </Grid.Column>
      </Grid>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const authData = {
        username: evt.target.username.value,
        firstName: evt.target.firstName.value,
        lastName: evt.target.lastName.value
      }
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, authData))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
