const { combineReducers } = require('redux')

const messages = require('./MessageReducer')
const user = require('./UserReducer')

module.exports = combineReducers({
  messages,
  user
})
