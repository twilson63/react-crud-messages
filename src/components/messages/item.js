const React = require('react')

const MessageItem = props =>
  <li className="pa3 pa4-ns bb b--black-10">
    <div className="fr">
      {
        props.message.username && (props.message.username === props.username) ? (
          <button
            onClick={props.editMessage(props.message)}
            className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black">
            Edit
          </button>
        ) : null

      }

    </div>
    <b className="db f3 mb1">
      {props.message.title} - {props.message.username || 'unknown'}
    </b>
    <span className="f5 db lh-copy measure">
      {props.message.body.split('\n').map(p => <p className="mt2">{p}</p>)}
    </span>
  </li>

MessageItem.propTypes = {
  editMessage: React.PropTypes.func,
  message: React.PropTypes.object,
  username: React.PropTypes.string
}

module.exports = MessageItem
