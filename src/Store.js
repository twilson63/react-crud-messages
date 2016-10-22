const redux = require('redux')
const reactRedux = require('react-redux')
const { hashHistory } = require('react-router')
const PouchDB = require('pouchdb')
const { pluck } = require('ramda')
// Action Types
const CREATE_MESSAGE = 'createMessage'
const LIST_MESSAGES = 'listMessages'
const EDIT_MESSAGE = 'editMessage'
const NEW_MESSAGE = 'newMessage'
const ERROR_MESSAGE = 'errorMessage'

const reducer = (state = { messages: [], message: {title: '', body: ''} }, action)  => {
  switch (action.type) {
    case LIST_MESSAGES:
      return Object.assign({}, state, { messages: action.value })
    case NEW_MESSAGE:
      return Object.assign({}, state, { message: {title: '', body: ''} })
    case EDIT_MESSAGE:
      return Object.assign({}, state, { message: action.value })
    case CREATE_MESSAGE:
      return Object.assign({}, state, { ok: action.value })
    case ERROR_MESSAGE:
      return Object.assign({}, state, { error: action.value })
    default:
      return state
  }
}

const store = redux.createStore(reducer, { messages: [], message: {title: '', body: ''} }, redux.compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))
const db = PouchDB('https://secure-pouchcloud-jgdkeovacz.now.sh/messages')
//const db = PouchDB('http://localhost:4000/messages')

const mapStateToProps = state => ({
  messages: state.messages,
  message: state.message
})
const mapDispatchToProps = dispatch => {
  return {
    createMessage: msg => {
      msg.idToken = localStorage.getItem('id_token')
      if (msg._id) {
        db.put(msg)
          .then(res => hashHistory.push('/'))
          .catch(err => dispatch({type: ERROR_MESSAGE, value: err.message}))
      } else {
        db.post(msg)
          .then(res => hashHistory.push('/'))
          .catch(err => dispatch({type: ERROR_MESSAGE, value: err.message}))
      }
    },
    listMessages: _ => {
      db.allDocs({ include_docs: true})
        .then(res => pluck('doc', res.rows))
        .then(docs => dispatch({type: LIST_MESSAGES, value: docs}))
        .catch(err => dispatch({type: ERROR_MESSAGE, value: 'An Error Occurred when trying to list MESSAGEs'}))
    },
    editMessage: message => {
      return (e) => {
        db.get(message._id)
          .then(doc => {
            dispatch({type: EDIT_MESSAGE, value: doc})
            hashHistory.push('/messages/' + message._id)
          })

      }
    },
    newMessage: e => {
      dispatch({type: NEW_MESSAGE, value: {}})
      hashHistory.push('/messages/new')
    },
    removeMessage: message => {
      db.remove(message)
        .then(res => {
          dispatch({type: NEW_MESSAGE, value: {}})
          hashHistory.push('/')
        })

    }
  }
}


const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store }
