const React = require('react')
const { Link } = require('react-router')
const { connector } = require('../../Store')
const { set, lensProp } = require('ramda')
const MessageForm = React.createClass({
  render() {
    return (
      <div className="pa4">
        <h1>Message Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="mv2">
            <label className="dn">Subject</label>
            <input className="db w-100 b pa2 input-reset ba bg-transparent" onChange={this.handleChange('title')} value={this.state.title} />
          </div>
          <div className="mv2">
            <label className="dn">Body</label>
            <textarea className="h5 w-100 b pa2 input-reset ba bg-transparent" onChange={this.handleChange('body')} value={this.state.body}>
            </textarea>
          </div>
          <button className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black">Publish Message</button>
        </form>
        <button onClick={this.handleRemove} className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black">Delete Message</button>
        <Link to="/" className="db mt2 link blue">Return to Messages</Link>
      </div>
    )
  },
  handleRemove(e) {
    if (confirm('Are you sure?')) {
      this.props.removeMessage(this.props.message)
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    this.props.createMessage(this.state)
    this.setState({body: '', title: ''})
  },
  handleChange(field) {
    return (e) => {
      this.setState(set(lensProp(field), e.target.value, {}))
    }
  },
  getInitialState() {
    return Object.assign({}, this.props.message)
  },
  propTypes: {
    createMessage: React.PropTypes.func,
    removeMessage: React.PropTypes.func,
    message: React.PropTypes.object
  }
})


module.exports = connector(MessageForm)
