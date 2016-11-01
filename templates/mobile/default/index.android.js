import {
    reducers
} from './js/data/reducers'
import {
    Styles as styles
} from './js/styles'
import {
    LOADING_ROUTE
} from './js/routes'
import * as config from './js/config'
import {
    renderApp
} from 'react-native-chunky'

renderApp({
    name: '<%= name %>',
    initialRoute: LOADING_ROUTE,
    reducers,
    styles,
    config
})
