var React = require("react");


require("./react-tag-list.scss");


module.exports = React.createClass({
  props: {
    values: React.PropTypes.array,
    onRemove: React.PropTypes.func,
    removeButtonLeft: React.PropTypes.bool
  },
  render: function() {
    var tags = this.props.values.map(function(value) {
      return (
        <div>
          <div className="rtl-tag">{value}</div>
          <div className="rtl-remove-button" onClick={this.props.onRemove.bind(this, value)}>X</div>
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