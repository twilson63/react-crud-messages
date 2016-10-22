const React = require('react')
const { Router, Route, hashHistory } = require('react-router')

const Store = require('./Store')
const { store } = Store
const reactRedux = require('react-redux')
const { Provider } = reactRedux

const {
  MessageList,
  MessageForm
} = require('./components')

const App = props =>
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={MessageList} />
      <Route path="/messages/new" component={MessageForm} />
      <Route path="/messages/:id" component={MessageForm} />
    </Router>
  </Provider>

module.exports = App
