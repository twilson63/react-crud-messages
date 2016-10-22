// ./src/views/Main/Login/Login.js
const React = require('react')
const AuthService = require('../utils/AuthService')
const { PropTypes } = React

const Login = React.createClass({
  render() {
    const { auth } = this.props.route

    return (
      <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
        <div className="tc">
          <img alt="kitten" src="http://placekitten.com/120/120" className="br-100 h4 w4 dib ba b--black-05 pa2" title="Kitty staring at you" />
          <h1 className="f3 mb2">Messages</h1>
          <button className="f6 link dim br-pill ba ph3 pv2 mb2 dib black bg-transparent" onClick={auth.login}>Login</button>
        </div>
      </article>
    )
  },
  propTypes: {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
  }
})

module.exports = Login
