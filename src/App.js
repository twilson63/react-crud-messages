const React = require('react')
const { Router, Route, hashHistory, IndexRedirect } = require('react-router')
const AuthService = require('./utils/AuthService').default

const Store = require('./Store')
const { store } = Store
const reactRedux = require('react-redux')
const { Provider } = reactRedux

const {
  MessageList,
  MessageForm,
  Login
} = require('./components')

const auth = new AuthService('GbCnPyB7No7qOfBquSTu2bpDIpkUeXWR', 'twilson63.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const App = props =>
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" auth={auth}>
        <IndexRedirect to="/messages"></IndexRedirect>
        <Route path="messages" auth={auth} component={MessageList} onEnter={requireAuth} />
        <Route path="messages/new" component={MessageForm} onEnter={requireAuth} />
        <Route path="messages/:id" component={MessageForm} onEnter={requireAuth} />
        <Route path="login" auth={auth} component={Login} />
      </Route>
    </Router>
  </Provider>

module.exports = App
