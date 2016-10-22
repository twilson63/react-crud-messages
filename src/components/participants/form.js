const React = require('react')
const { connector } = require('../../Store')

const {func, string} = React.PropTypes

const ParticipantForm = React.createClass({
  render() {
    return <h1>{ this.props.message }</h1>
  }
})

ParticipantForm.propTypes = {
  createParticipant: func,
  message: string
}

module.exports = connector(ParticipantForm)
