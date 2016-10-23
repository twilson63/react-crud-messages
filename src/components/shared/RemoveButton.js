const h = require('react-hyperscript')

module.exports = props =>
  props.editMode ?
    h('button', {
      className: "f6 link dim br2 ph3 pv2 mb2 dib white bg-light-red",
      onClick: props.onClick
    }, props.children) : null
