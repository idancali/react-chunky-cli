import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    Text,
    Image,
    ActivityIndicator,
    Linking
} from 'react-native'
import {Styles} from '../styles'
import {Strings} from '../strings'
import * as Images from '../images'
import {AuthContainer, retrieveAuthToken, clearAuthToken} from 'react-chunky'
import {DASHBOARD_ROUTE} from '../routes'

class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hidePassword: true,
            username: "",
            password: ""
        }
    }

    componentDidMount() {
        clearAuthToken().

        // We should now be officially logged out
        then(() => this.setState({})).

        //TODO: handle errors when token clean up fails
        /**/catch((error) => console.log(error))
    }

    focusNextField(nextField) {
        this.refs[nextField].focus()
    }

    onloginPressed() {
        this.props.authenticate({username: this.state.username, password: this.state.password})
    }

    renderFormActionButtonContent() {
        if (this.props.isAuthenticating()) {
            return (<ActivityIndicator color="white" size="large" animating={true} style={styles.progressButtonContent}/>)
        }
        return (
            <Text style={[Styles.Buttons.DEFAULT_TITLE]}>
                {Strings.Main.LOGIN_NOW}
            </Text>
        )
    }

    renderFormActionButton() {
        return (
            <TouchableOpacity activeOpacity={0.8} style={[
                styles.flex, Styles.Buttons.DEFAULT, this.props.isAuthenticating() && styles.progressButton
            ]} onPress={this.onloginPressed.bind(this)}>
                {this.renderFormActionButtonContent()}
            </TouchableOpacity>
        )
    }

    componentWillReceiveProps(nextProps) {
        const oldAuthToken = this.props.getAuthenticationToken()
        const authToken = nextProps.getAuthenticationToken()
        authToken && !oldAuthToken && this.props.onSuccessfulLogin && this.props.onSuccessfulLogin()
    }

    renderFormError() {
        if (!this.props.hasAuthenticationError()) {
            return (<View/>)
        }

        return (
            <Text style={[styles.flex, styles.error]}>
                {this.props.getAuthenticationError()}
            </Text>
        )
    }

    renderLoginForm() {
        return (
            <View style={styles.screenSegmentStart}>
                <View style={styles.flex}>
                    <TextInput ref="username" onChangeText={(text) => this.setState({username: text})} editable={!this.props.isAuthenticating()} style={[
                        styles.input,
                        (Platform.OS == 'ios')
                            ? styles.inputBackground
                            : null
                    ]} placeholderTextColor={Styles.Colors.SUBTLE} underlineColorAndroid={Styles.Colors.SUBTLE} selectionColor={Styles.Colors.TEXT} placeholder={Strings.Main.LOGIN_NAME} blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => this.focusNextField('password')}/>
                </View>
                <View style={styles.flex}>
                    <TextInput ref="password" onChangeText={(text) => this.setState({password: text})} style={[
                        styles.input,
                        (Platform.OS == 'ios')
                            ? styles.inputBackground
                            : null
                    ]} placeholderTextColor={Styles.Colors.SUBTLE} editable={!this.props.isAuthenticating()} underlineColorAndroid={Styles.Colors.SUBTLE} selectionColor={Styles.Colors.TEXT} secureTextEntry={this.state.hidePassword} placeholder={Strings.Main.LOGIN_PASSWORD} maxLength={30} blurOnSubmit={true} returnKeyType="go" onSubmitEditing={this.onloginPressed.bind(this)}/>
                </View>
                {this.renderFormActionButton()}
                {this.renderFormError()}
            </View>
        )
    }

    render() {
        return (
            <View style={Styles.Containers.MAIN}>
                <Text style={[styles.flex, styles.title, styles.screenSegmentCenter]}>
                    {Strings.Main.PLEASE_LOGIN}
                </Text>
                {this.renderLoginForm()}
            </View>
        )
    }
}

let styles = StyleSheet.create({
    screenSegmentCenter: {
        flex: 0.1,
        alignItems: 'center'
    },
    title: {
      fontSize: 25,
      alignSelf: "center",
      color: Styles.Colors.LIGHT,
      marginTop: 45
    },
    screenSegmentStart: {
        flex: 0.9,
        alignItems: 'flex-start'
    },
    progressButtonContent: {
        flex: 1
    },
    progressButton: {
        backgroundColor: "transparent"
    },
    flex: {
        flexDirection: 'row',
        marginHorizontal: Platform.OS == 'ios'
            ? 15
            : 30,
        marginTop: 15
    },
    input: {
        flex: 1,
        fontSize: Platform.OS == 'ios'
            ? 16
            : 13.5,
        borderRadius: 2,
        color: Styles.Colors.TEXT,
        padding: Platform.OS == 'ios'
            ? 15
            : 4,
        height: 50,
        marginBottom: 4
    },
    inputBackground: {
        backgroundColor: Styles.Colors.LIGHT
    },
    spinner: {
        margin: 40,
        height: 120
    },
    error: {
        alignSelf: "center",
        color: Styles.Colors.LIGHT
    }
})

export default AuthContainer(LoginForm)
