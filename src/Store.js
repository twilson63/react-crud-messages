const redux = require('redux')
const reactRedux = require('react-redux')

const MessageActions = require('./actions/MessageActions')

const reducers = require('./reducers')

// enable redux for devTools
const store = redux.createStore(reducers, {
  messages: {messages: [], message: {title: '', body: ''} },
  user: { username: ''}
}, redux.compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))

const mapStateToProps = state => ({
  messages: state.messages,
  user: state.user
})

const mapDispatchToProps = MessageActions

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store }
