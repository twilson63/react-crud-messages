// Action Types
const {
  LIST_MESSAGES,
  EDIT_MESSAGE,
  NEW_MESSAGE,
  ERROR_MESSAGE,
  SHOW_MESSAGES
} = require('../actions/MessageActionTypes')

module.exports = (state = { messages: [], message: {title: '', body: ''} }, action)  => {
  switch (action.type) {
    case LIST_MESSAGES:
      return Object.assign({}, state, { messages: action.value })
    case NEW_MESSAGE:
      return Object.assign({}, state, { message: {title: '', body: ''} })
    case SHOW_MESSAGES:
      return Object.assign({}, state, { message: {title: '', body: ''} })
    case EDIT_MESSAGE:
      return Object.assign({}, state, { message: action.value })
    case ERROR_MESSAGE:
      return Object.assign({}, state, { error: action.value })
    default:
      return state
  }
}
