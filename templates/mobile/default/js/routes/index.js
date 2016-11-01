// Get a hold of all available screens to be mapped to the routes
import * as Screens from '../screens'

// Route IDs for all supported routes
export const LOADING_ROUTE_ID          			        = '/loading'
export const LOGIN_ROUTE_ID            			        = '/loginScreen'
export const DASHBOARD_ROUTE_ID        			        = '/dashboardScreen'

// Root Routes for each of the app sections
export const LOADING_ROUTE             		          = {path: LOADING_ROUTE_ID, screen: Screens.LoadingScreen}
export const LOGIN_ROUTE               		          = {path: LOGIN_ROUTE_ID, screen: Screens.LoginScreen}
export const DASHBOARD_ROUTE           		          = {path: DASHBOARD_ROUTE_ID, screen: Screens.DashboardScreen}

// Allow the app to customize route properties
export const routeWithProps = (route, props)        => Object.assign(route, { props })
