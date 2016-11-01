import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';

import * as Colors from './colors';

export default Sheet = StyleSheet.create({
    MAIN: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: (Platform.OS === 'ios')
            ? null
            : Colors.BACKGROUND,
        justifyContent: "center"
    },
    DEFAULT: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND
    },
    STATUSBAR: {
        backgroundColor: Colors.PRIMARY,
        flex: 1,
        paddingTop: (Platform.OS === 'ios')
            ? 20
            : 0
    }
});
