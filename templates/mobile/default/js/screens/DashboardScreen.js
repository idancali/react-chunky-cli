import React, { Component } from 'react';
import {
  View,
  Text,
  BackAndroid,
} from 'react-native';
import * as Images    from '../images';
import { Styles }     from '../styles';
import { Strings }    from '../strings';
import {
  NavigationBar,
  Dashboard
} from '../components';
import {
  PREPAY_PAYMENT_DETAILS_NO_MENU_ROUTE,
  INVOICE_PAYMENT_DETAILS_NO_MENU_ROUTE,
  DASHBOARD_ROUTE_ID
} from '../routes';

export default class DashboardScreen extends Component {

  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
  }

  goBack() {
    let scenes = this.props.navigator.getCurrentRoutes(),
      scenesLength = scenes.length - 1;

    if (this.state.isRightDrawerOpen) {
      this.closeRightDrawer();
    }
    else if (this.state.isLeftDrawerOpen) {
      this.closeLeftDrawer();
    }
    else if (scenesLength === 0) {
      BackAndroid.exitApp();
    }
    return true;
  }

  openLeftMenuDrawer() {
    this.openDrawer();
  }

  openRightMenuDrawer() {
    this.openRightDrawer();
  }

  goToInvoicePaymentDetails() {
    this.props.navigator.push(INVOICE_PAYMENT_DETAILS_NO_MENU_ROUTE);
  }

  goToPrepayPaymentDetails() {
    this.props.navigator.push(PREPAY_PAYMENT_DETAILS_NO_MENU_ROUTE);
  }

  closeRightDrawerPressed() {
    this.closeRightDrawer();
  }

  get content() {
    return (
      <Dashboard
        onInvoicePaymentDetailsPressed={this.goToInvoicePaymentDetails.bind(this)}
        onPrepayPaymentDetailsPressed={this.goToPrepayPaymentDetails.bind(this)}
        onCloseRightDrawerPressed={this.closeRightDrawerPressed.bind(this)} />
   );
  }

  get navigationBar() {
    return (
      <NavigationBar
        title={Strings.Main.DASHBOARD_TITLE}
        leftIcon={Images.MENU}
        rightIcon={Images.USER_NOTIFY}
        onLeftItemPressed={this.openLeftMenuDrawer.bind(this)}
        onRightItemPressed={this.openRightMenuDrawer.bind(this)}
      />
    );
  }
}
