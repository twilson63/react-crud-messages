const h = require('react-hyperscript')
//
// Usage:
//
//  <TextField label="Email" value={this.state.email}
//   onChange={this.handleChange('email')} />
//

const inputClassName = "db w-100 b br2 pa2 input-reset ba bg-transparent"
module.exports = props => 
  h('div.mv2', [
    h('label.dn', [props.label]),
    h('input', {
      type: 'text',
      onChange: props.onChange,
      value: props.value,
      className: inputClassName,
      placeholder: props.label
    })
  ])
