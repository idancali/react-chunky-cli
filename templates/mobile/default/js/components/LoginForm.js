import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';

import { Styles }           from '../styles';
import { Strings }          from '../strings';
import { UndoiText }        from '../components';
import * as Images          from '../images';
import {
  AuthContainer,
  retrieveAuthToken,
  clearAuthToken
} from 'react-chunky'
import { DASHBOARD_ROUTE }  from '../routes'

let textColor = Platform.OS == 'ios' ? Styles.Colors.LOGIN_IOS : Styles.Colors.LOGIN_ANDROID;
const changePasswordURL = "https://administrez.un-doi.ro/admin/resetPassword";

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hidePassword: true,
      username: "webjs",
      password: "test12"
    };
  }

  componentDidMount() {
    clearAuthToken().

      // We should not be officially logged out
      then(() => this.setState({})).

      //TODO: handle errors when token clean up fails
      catch((error) => console.log(error))
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  showPassword() {
    this.setState({
      hidePassword: !this.state.hidePassword,
    });
  }

  onloginPressed() {
    this.props.authenticate({ username: this.state.username, password: this.state.password })
  }

  onForgotPasswordPressed() {
    Linking.canOpenURL(changePasswordURL).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(changePasswordURL);
      }
    }).catch(err => console.error('An error occurred', err))
  }

  renderFormActionButtonContent() {
    if (this.props.isAuthenticating()) {
      return (<ActivityIndicator
        color="white"
        size="large"
        animating={true}
        style={styles.progressButtonContent}
        />)
    }
    return (<UndoiText
        fontFamily="semiBold"
        style={[ Styles.Buttons.DEFAULT_TITLE ]}>
        { Strings.Main.LOGIN }
      </UndoiText>)
  }

  renderFormActionButton() {
    return (<TouchableOpacity
      activeOpacity={0.8}
      style={[ styles.flex, Styles.Buttons.LOGIN, this.props.isAuthenticating() && styles.progressButton]}
      onPress={this.onloginPressed.bind(this)}>
      { this.renderFormActionButtonContent() }
    </TouchableOpacity>)
  }

  componentWillReceiveProps(nextProps) {
    const oldAuthToken = this.props.getAuthenticationToken()
    const authToken = nextProps.getAuthenticationToken()
    authToken && !oldAuthToken && this.props.onSuccessfulLogin && this.props.onSuccessfulLogin()
  }

  renderFormForgotButton() {
    if (this.props.isAuthenticating()) {
      return (<View/>)
    }

    return (<TouchableOpacity
      activeOpacity={0.8}
      style={[ styles.flex ]}
      onPress={this.onForgotPasswordPressed.bind(this)}>
        <UndoiText
          fontFamily="regular"
          style={styles.forgotPassword}>
          { Strings.Main.FORGOT_PASSWORD }
        </UndoiText>
      </TouchableOpacity>)
  }

  renderFormError() {
    if (!this.props.hasAuthenticationError()) {
      return (<View/>)
    }

    return (<UndoiText
        fontFamily="semiBold"
        style={[styles.flex, styles.error]}>
        { this.props.getAuthenticationError() }
      </UndoiText>)
  }

  renderLoginForm() {
    return (
      <View style={styles.screenSegmentStart}>
        <View style={styles.flex}>
          <TextInput
            ref="username"
            onChangeText={(text) => this.setState({ username: text })}
            editable={!this.props.isAuthenticating()}
            style={[ styles.input, (Platform.OS == 'ios') ? styles.inputBackground : null ]}
            placeholderTextColor={textColor}
            underlineColorAndroid={textColor}
            selectionColor={textColor}
            placeholder={Strings.Main.LOGIN_NAME}
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => this.focusNextField('password')} />
        </View>
        <View style={styles.flex}>
          <TextInput
            ref="password"
            onChangeText={(text) => this.setState({ password: text })}
            style={[ styles.input, (Platform.OS == 'ios') ? styles.inputBackground : null ]}
            placeholderTextColor = {textColor}
            editable={!this.props.isAuthenticating()}
            underlineColorAndroid={textColor}
            selectionColor={textColor}
            secureTextEntry={this.state.hidePassword}
            placeholder={Strings.Main.LOGIN_PASSWORD}
            maxLength={30}
            blurOnSubmit={true}
            returnKeyType="go"
            onSubmitEditing={this.onloginPressed.bind(this)} />
          <TouchableOpacity
            style={styles.seePassword}
            onPress={this.showPassword.bind(this)}
            hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
            <Image
              style={styles.seePassIcon}
              source={this.state.hidePassword ? Images.SEE_PASSWORD : Images.HIDE_PASSWORD} />
          </TouchableOpacity>
        </View>
        { this.renderFormActionButton() }
        { this.renderFormForgotButton() }
        { this.renderFormError() }
      </View>)
  }

  renderLoginContent() {
    return (
      <View style={ Styles.Containers.LOGIN }>
        <View style={[ styles.flex, styles.screenSegmentCenter ]}>
          <Image
            style={styles.logo}
            source={Images.LOGIN_LOGO} />
        </View>
        { this.renderLoginForm() }
      </View>
    );
  }

  render() {
    if (Platform.OS == "ios") {
      return (
        <Image
          style={styles.imageBackground}
          source={Images.LOGIN_BACKGROUND}>
          { this.renderLoginContent() }
        </Image>
      );
    }
    else {
      return this.renderLoginContent();
    }
  }
}

let styles = StyleSheet.create({
  screenSegmentCenter: {
    flex: 0.2,
    alignItems: 'center'
  },
  screenSegmentStart: {
    flex: 0.3,
    alignItems: 'flex-start'
  },
  progressButtonContent: {
    flex: 1
  },
  progressButton : {
    backgroundColor: "transparent"
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
	flex: {
    flexDirection: 'row',
    marginHorizontal: Platform.OS == 'ios' ? 15 : 30,
    marginTop: 15
	},
  imageBackground: {
    flex: 1,
    width: null,
    height: null,
  },
  input: {
    flex: 1,
    fontFamily: Platform.OS == 'ios' ? 'TitilliumWeb-Regular' : 'Roboto-Regular',
    fontSize: Platform.OS == 'ios' ? 16 : 13.5,
    borderRadius: 7,
    color: textColor,
    padding: Platform.OS == 'ios' ? 15 : 4,
    height: 50,
    marginBottom: 4,
  },
  inputBackground: {
    backgroundColor: Styles.Colors.LOGIN_IOS_INPUT_BACKGROUND,
  },
  seePassword: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  seePassIcon: {
    resizeMode: 'contain',
  },
  spinner: {
    margin: 40,
    height: 120
  },
  error: {
    alignSelf: "center",
    color: "#ef9a9a"
  },
  forgotPassword: {
    flex: 1,
    color: textColor,
    fontSize: Platform.OS == 'ios' ? 14 : 12,
    textAlign: 'center',
  },
});

export default AuthContainer(Login)
