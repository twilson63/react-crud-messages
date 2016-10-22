const React = require('react')
const { connector } = require('../../Store')
const MessageItem = require('./item')

const MessageList = props =>
  <div className="pa4">
    <div className="fr">
        <a
          onClick={props.newMessage}
          className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black">
          New Message
        </a>
        <a
          onClick={props.route.auth.logout}
          className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black ml2" >
          Logout
        </a>
    </div>
    <h1>Messages</h1>
    <ul className="list pl0">
      { props.messages.map(m =>
          <MessageItem
            message={m}
            key={m._id}
            editMessage={props.editMessage}
          />
        )
      }
    </ul>
  </div>

MessageList.propTypes = {
  listMessages: React.PropTypes.func,
  editMessage: React.PropTypes.func,
  newMessage: React.PropTypes.func
}


module.exports = connector(MessageList)
