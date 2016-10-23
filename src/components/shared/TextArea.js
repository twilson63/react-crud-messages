const h = require('react-hyperscript')
//
// Usage:
//
//  <TextArea label="Description" value={this.state.body}
//   onChange={this.handleChange('body')} />
//
module.exports = props =>
  h('div.mv2', [
    h('label.dn', [props.label]),
    h('textarea.h5.bb.br2.w-100.pa2', {
      onChange: props.onChange,
      value: props.value,
      placeholder: props.label
    })
  ])
