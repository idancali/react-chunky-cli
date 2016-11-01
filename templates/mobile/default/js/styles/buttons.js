import React, {
    Component
} from 'react';
import {
    Platform,
    StyleSheet,
} from 'react-native';

import * as Colors from './colors';

export default Sheet = StyleSheet.create({
    DEFAULT_TITLE: {
        flex: 1,
        color: Colors.LIGHT,
        textAlign: 'center',
        fontSize: Platform.OS == 'ios' ? 16 : 13,
    },
    DEFAULT: {
        flexDirection: 'row',
        backgroundColor: Colors.ACCENT,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Platform.OS == 'ios' ? null : 7,
        marginBottom: Platform.OS == 'ios' ? null : 50,
        borderRadius: 2
    }
})
