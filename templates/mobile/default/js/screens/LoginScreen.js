import React, { Component }  from 'react'
import { Styles }            from '../styles'
import { Strings }           from '../strings'
import { LoginForm }         from '../components'
import { DASHBOARD_ROUTE }   from '../routes'

const dismissKeyboard = require('dismissKeyboard')

export default class LoginScreen extends Component {

  componentWillReceiveProps(nextProps) {
    const oldUser = this.props.getUserData()
    const user    = nextProps.getUserData()

    // If we got the user, let's go to the user dashboard
    user && !oldUser && this.props.navigator.replace(DASHBOARD_ROUTE)
  }

  onSuccessfulLogin() {
    this.props.onAppSuccessfulAuthentication && this.props.onAppSuccessfulAuthentication()
  }

  render() {
    return (<LoginForm
        onSuccessfulLogin={this.onSuccessfulLogin.bind(this)}
        config={this.props.config}
        />
    )
  }
}
