import { reducers }           from './js/data'
import { Styles as styles }   from './js/styles'
import { START_ROUTE }        from './js/routes'
import * as config            from './js/config'
import { renderApp }          from 'react-native-chunky'

renderApp({
  name: '<%= name %>',
  initialRoute: START_ROUTE,
  reducers, styles, config
})
