// Action Types
const {
  UPDATE_USERNAME
} = require('../actions/UserActionTypes')

module.exports = (state = { username: '' }, action)  => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return Object.assign({}, state, { username: action.value })
    default:
      return state
  }
}
