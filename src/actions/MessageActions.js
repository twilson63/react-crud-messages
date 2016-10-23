const { hashHistory } = require('react-router')

// services
const MessageService = require('../utils/MessageService')
const {
  LIST_MESSAGES,
  EDIT_MESSAGE,
  NEW_MESSAGE,
  ERROR_MESSAGE,
  SHOW_MESSAGES
} = require('./MessageActionTypes')

const svc = MessageService()

module.exports = function (dispatch) {
  return {
    createMessage: msg => {
      msg.idToken = localStorage.getItem('id_token')
      msg.updated = (new Date()).toString()
      if (msg._id) {
        svc.put(msg)
          .then(res => hashHistory.push('/'))
          .catch(err => dispatch({type: ERROR_MESSAGE, value: err.message}))
      } else {
        svc.post(msg)
          .then(res => hashHistory.push('/'))
          .catch(err => dispatch({type: ERROR_MESSAGE, value: err.message}))
      }
    },
    listMessages: _ => {
      svc.list()
        .then(docs => dispatch({type: LIST_MESSAGES, value: docs}))
        .catch(err => dispatch({type: ERROR_MESSAGE, value: 'An Error Occurred when trying to list MESSAGEs'}))
    },
    editMessage: message => {
      return (e) => {
        svc.get(message._id)
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
      svc.remove(message)
        .then(res => {
          dispatch({type: NEW_MESSAGE, value: {}})
          hashHistory.push('/')
        })
    },
    showMessages: e => {
      dispatch({type: SHOW_MESSAGES, value: {} })
      hashHistory.push('/')
    },
    searchMessages: q => {
      svc.search(q)
        .then(docs => dispatch({type: LIST_MESSAGES, value: docs}))
        .catch(err => dispatch({type: ERROR_MESSAGE, value: 'An Error Occurred when trying to list MESSAGEs'}))
    }
  }
}
