const React = require('react')

const MessageItem = props =>
  <li className="pa3 pa4-ns bb b--black-10">
    <div className="fr">
      <button
        onClick={props.editMessage(props.message)}
        className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black">
        Edit
      </button>
    </div>
    <b className="db f3 mb1">
      {props.message.title}
    </b>
    <span className="f5 db lh-copy measure">
      {props.message.body}
    </span>
  </li>

MessageItem.propTypes = {
  editMessage: React.PropTypes.func,
  message: React.PropTypes.object
}

module.exports = MessageItem
