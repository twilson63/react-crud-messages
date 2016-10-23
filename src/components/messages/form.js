const React = require('react')
const { connector } = require('../../Store')
const { set, lensProp } = require('ramda')
const { TextField, TextArea, Form } = require('../shared')

const MessageForm = React.createClass({
  render() {
    const { handleSubmit, state, props, handleChange, handleRemove } = this
    return (
      <div className="pa4">
        <Form label={`Message Form - ${props.user.username}`} ok="Publish" cancel="Cancel" remove="Remove"
          onOk={handleSubmit} onCancel={props.showMessages} onRemove={handleRemove}
          editMode={!!state._id} >
          {/* form fields */}
          <TextField label="Subject" value={state.title} onChange={handleChange('title')} />
          <TextArea label="Body" value={state.body} onChange={handleChange('body')} />
        </Form>
      </div>
    )
  },
  handleRemove(e) {
    if (confirm('Are you sure?')) {
      this.props.removeMessage(this.props.messages.message)
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
    return Object.assign({}, this.props.messages.message)
  },
  propTypes: {
    createMessage: React.PropTypes.func,
    removeMessage: React.PropTypes.func,
    showMessages: React.PropTypes.func
    //message: React.PropTypes.object
  }
})


module.exports = connector(MessageForm)
