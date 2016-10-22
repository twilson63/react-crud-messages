const redux = require('redux')
const reactRedux = require('react-redux')

const MessageActions = require('./actions/MessageActions')

const reducer = require('./reducers/MessageReducer')

// enable redux for devTools
const store = redux.createStore(reducer, { messages: [], message: {title: '', body: ''} }, redux.compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))

const mapStateToProps = state => ({
  messages: state.messages,
  message: state.message
})

const mapDispatchToProps = MessageActions

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store }
