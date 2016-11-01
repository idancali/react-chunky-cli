import { Styles }            from '../styles'
import { Strings }           from '../strings'
import React, { Component }  from 'react'
import { retrieveAuthToken } from 'react-chunky'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native'
import {
  LOGIN_ROUTE,
  DASHBOARD_ROUTE
} from '../routes'

export default class LoadingScreen extends Component {

  constructor (props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const oldUser = this.props.getUserData()
    const user    = nextProps.getUserData()

    // If we got the user, let's go to the user dashboard
    user && !oldUser && this.props.navigator.replace(DASHBOARD_ROUTE)
  }

  componentDidMount() {
    retrieveAuthToken().
      // If we're logged in, let's signal a successful authentication
      then((token) => {
        return this.props.onAppSuccessfulAuthentication && this.props.onAppSuccessfulAuthentication()
      }).

      // If we're not logged in, let's go straight to the login screen
      catch((err) => this.props.navigator.replace(LOGIN_ROUTE))
  }

  renderContent() {
    return (<ActivityIndicator
              color="white"
              size="large"
              animating={true}
              />)
  }

  render() {
    //TODO: add a nicer loading splash here
    return (
      <View style={ Styles.Containers.LOGIN }>
          {this.renderContent()}
      </View>
    );
  }
}
