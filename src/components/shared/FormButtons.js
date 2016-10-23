const React = require('react')
const { string, func, bool } = React.PropTypes

const RemoveButton = require('./RemoveButton')

const FormButtons = props =>
  <div className="cf">
    <RemoveButton editMode={props.editMode} onClick={props.onRemove}>
      {props.remove}
    </RemoveButton>
    <div className="fr">
      <button className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black">
        { props.ok }
      </button>
      <button
        type="button"
        onClick={props.onCancel}
        className="f6 link dim br2 ph3 pv2 mb2 dib white bg-gray ml2">
        { props.cancel }
      </button>
    </div>
  </div>

FormButtons.propTypes = {
  ok: string,
  remove: string,
  cancel: string,
  onCancel: func,
  onRemove: func,
  editMode: bool
}

module.exports = FormButtons
