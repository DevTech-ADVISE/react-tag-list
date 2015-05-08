var React = require("react");
require("./react-tag-list.scss");

module.exports = React.createClass({
  propTypes: {
    values: React.PropTypes.array,
    onRemove: React.PropTypes.func,
    removeButtonLeft: React.PropTypes.bool
  },
  onRemoveFunc: function() {
    if(this.props.onRemove)
      return this.props.onRemove;
    else
      return function(value) {};
  },
  render: function() {

    var tags = this.props.values.map(function(value) {
      return (
        <li className="rtl-tag">
          <span className="rtl-label">{value.label}</span>
          <button className="rtl-remove-button" name="clear" value={value.label} onClick={this.onRemoveFunc().bind(null, value.value)}>X</button>
        </li>
      );
    }.bind(this));

    return (
      <ul className="react-tag-list">
        {tags}
      </ul>
    );
  }
});