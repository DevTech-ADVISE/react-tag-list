var React = require("react");
require("./react-tag-list.scss");

module.exports = React.createClass({
  props: {
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
        <div className="rtl-tag" onClick={this.onRemoveFunc().bind(null, value.value)}>
          <div className="rtl-label">{value.label}</div>
          <div className="rtl-remove-button">X</div>
        </div>
      );
    }.bind(this));

    return (
      <div className="react-tag-list">
        {tags}
      </div>
    );
  }
});