const React = require('react')
const { connector } = require('../../Store')
const MessageItem = require('./item')

const MessageList = React.createClass({
  render() {
    const { handleSearch, handleChange, props, state } = this
    return (
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
          <form onSubmit={handleSearch}>
            <input
              className="w-100 pa2"
              placeholder="Search for Subject (Starts With)"
              onChange={handleChange}
              value={state.q} />
          </form>
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
    )
  },
  handleChange (e) {
    this.setState({q: e.target.value})
  },
  handleSearch (e) {
    e.preventDefault()
    this.props.searchMessages(this.state.q)
  },
  getInitialState () {
    return { q: '' }
  }
})

MessageList.propTypes = {
  listMessages: React.PropTypes.func,
  editMessage: React.PropTypes.func,
  searchMessages: React.PropTypes.func,
  newMessage: React.PropTypes.func
}


module.exports = connector(MessageList)
