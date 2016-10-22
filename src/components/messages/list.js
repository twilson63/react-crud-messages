const React = require('react')
const { connector } = require('../../Store')
const MessageItem = require('./item')

const MessageList = React.createClass({
  componentDidMount() {
    this.props.listMessages()
  },
  render() {
    return (
      <div className="pa4">
        <div className="fr">
            <a
              onClick={this.props.newMessage}
              className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black">
              New Message
            </a>
        </div>
        <h1>Messages</h1>
        <ul className="list pl0">
          { this.props.messages.map(m =>
              <MessageItem
                message={m}
                key={m._id}
                editMessage={this.props.editMessage}
              />
            )
          }
        </ul>
      </div>
    )
  },
  propTypes: {
    listMessages: React.PropTypes.func,
    editMessage: React.PropTypes.func,
    newMessage: React.PropTypes.func
  }
})

module.exports = connector(MessageList)
