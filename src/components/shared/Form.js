const h = require('react-hyperscript')
const FormButtons = require('./FormButtons')
const { string, func, boolean } = require('react').PropTypes
//
// Usage:
//
//  <Form onSubmit={this.handleSubmit}>
//    Add Fields Here
//  </Form>
//
const Form = props =>
  h('form', { onSubmit: props.onOk }, [
    h('h1.f3', [props.label]),
    props.children,
    h(FormButtons, {
      ok: props.ok,
      cancel: props.cancel,
      remove: props.remove,
      onRemove: props.onRemove,
      onCancel: props.onCancel,
      editMode: props.editMode
    })
  ])

Form.propTypes = {
  ok: string,
  cancel: string,
  remove: string,
  onOk: func,
  onCancel: func,
  onRemove: func,
  editMode: boolean
}

module.exports = Form
