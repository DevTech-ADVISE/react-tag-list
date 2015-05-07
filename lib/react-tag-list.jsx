var React = require("react");
require("./react-tag-list.scss");

module.exports = React.createClass({
  propTypes: {
    values: React.PropTypes.array,
    onRemove: React.PropTypes.func,
    tagHeight: React.PropTypes.number,
    tagContainerCollapsedHeight: React.PropTypes.number,
    tagContainerExpandedHeight: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {tagContainerCollapsedHeight: 95,
            tagContainerExpandedHeight: 300};
  },
  getInitialState: function() {
    return {expanded: false, showExpandButton: false};
  },
  componentDidUpdate: function() {
    if(this.props.values.length === 0) return;

    var lastTag, ltRef, isOverflowing;
    ltRef = "tag-" + String(this.props.values.length-1);
    lastTag = this.refs[ltRef].getDOMNode();
    isOverflowing = this.isLastTagOverflowing(lastTag);

    if(!this.state.showExpandButton && ((isOverflowing && !this.state.expanded) || this.state.expanded))
      this.setState({showExpandButton: true});
    else if(this.state.showExpandButton && !isOverflowing && !this.state.expanded)
      this.setState({showExpandButton: false});
  },
  onRemoveFunc: function() {
    if(this.props.onRemove)
      return this.props.onRemove;
    else
      return function(value) {};
  },
  toggleExpand: function() {
    this.setState({expanded: !this.state.expanded});
  },
  isLastTagOverflowing: function(tag) {
    var containerHeight = this.refs["rtl-container"].getDOMNode().getBoundingClientRect().bottom;
    //have to add + 1 pixel for whatever reason
    if(tag.getBoundingClientRect().bottom > containerHeight)
      return true;

    return false;
  },
  render: function() {
    var tags, containerHeight, expandText, expandButton, collapsedStyleName;

    tags = this.props.values.map(function(value, vIndex) {
      return (
        <div ref={"tag-" + vIndex} className="rtl-tag" onClick={this.onRemoveFunc().bind(null, value.value)}>
          <div className="rtl-label">{value.label}</div>
          <div className="rtl-remove-button">X</div>
        </div>
      );
    }.bind(this));

    if(this.state.expanded) {
      collapsedStyleName = "rtl-expanded";
      containerHeight = this.props.tagContainerExpandedHeight;
      expandText = "Show less";
    }
    else {
      collapsedStyleName = "rtl-collapsed";
      containerHeight = this.props.tagContainerCollapsedHeight;
      expandText = "Show more...";
    }

    if(this.state.showExpandButton)
      expandButton = (<div className="expand-button show"onClick={this.toggleExpand}>{expandText}</div>);
    else
      expandButton = (<div className="expand-button hide"onClick={this.toggleExpand}>{expandText}</div>);

    var rtlStyles = {
      height: containerHeight
    };

    return (
      
      <div ref="rtl-container" className="react-tag-list" >
        <div className={"rtl-tags" + " " + collapsedStyleName} style={rtlStyles}>{tags}</div> 
        {expandButton}    
      </div>
    );
  }
});