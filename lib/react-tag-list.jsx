var React = require("react");
require("./react-tag-list.scss");

module.exports = React.createClass({
  propTypes: {
    values: React.PropTypes.array,
    onRemove: React.PropTypes.func,
    tagHeight: React.PropTypes.number,
    tagContainerCollapsedHeight: React.PropTypes.number,
    tagContainerExpandedHeight: React.PropTypes.number,
    fluidMaxHeight: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {tagContainerCollapsedHeight: 65,
            tagContainerExpandedHeight: 150,
            fluidMaxHeight: true};
  },
  getInitialState: function() {
    return {expanded: false, showExpandButton: false, shownCount: 0};
  },
  componentDidUpdate: function() {
    if(this.props.values.length === 0) return;

    var lastTag, ltRef, isOverflowing;
    ltRef = "tag-" + String(this.props.values.length-1);
    lastTag = this.refs[ltRef].getDOMNode();
    isOverflowing = this.isTagOverflowing(lastTag);

    if(!this.state.showExpandButton && ((isOverflowing && !this.state.expanded) || this.state.expanded))
      this.setState({showExpandButton: true, shownCount: this.getShownCount()});
    else if(this.state.showExpandButton && !isOverflowing && !this.state.expanded)
      this.setState({showExpandButton: false, shownCount: this.getShownCount()});

    if(this.state.shownCount !== this.getShownCount())
      this.setState({shownCount: this.getShownCount()});
  },
  onRemoveFunc: function() {
    if(this.props.onRemove)
      return this.props.onRemove;
    else
      return function(value) {};
  },
  toggleExpand: function() {
    this.setState({expanded: !this.state.expanded, shownCount: this.getShownCount()});
  },
  isTagOverflowing: function(tagDOMNode) {
    var containerHeight = this.refs["rtl-tags"].getDOMNode().getBoundingClientRect().bottom;
    //check that the last tag is above or below the bottom of the container
    if(tagDOMNode.getBoundingClientRect().bottom > containerHeight)
      return true;

    return false;
  },
  getShownCount: function() {
    var visibleHeight = this.refs['rtl-tags'];
    //go through all values, get each ref element, 
    //and check if the bottom of it is overlapped by the bottom of the tag list box
    var shownCount = 0;
    this.props.values.forEach(function(v, vIndex) {
      var tagDOMNode = this.refs["tag-" + vIndex].getDOMNode();
      if(this.isTagOverflowing(tagDOMNode))
        return; //continue to next tag
      else
        shownCount ++;
    }.bind(this));

    return shownCount;

  },
  render: function() {
    var tags, containerHeight, expandText, expandButton, collapsedStyleName, countText;

    tags = this.props.values.map(function(value, vIndex) {
      return (
        <div ref={"tag-" + vIndex} key={"tag-" + vIndex} className="rtl-tag" onClick={this.onRemoveFunc().bind(null, value.value)}>
          <div className="rtl-label">{value.label}</div>
          <div className="rtl-remove-button">X</div>
        </div>
      );
    }.bind(this));

    countText = "showing " + String(this.state.shownCount) + " of " + this.props.values.length;
    if(this.state.expanded) {
      collapsedStyleName = "rtl-expanded";
      if(this.props.fluidMaxHeight)
        containerHeight = 
      containerHeight = this.props.tagContainerExpandedHeight;
      expandText = "Show less";
    }
    else {
      collapsedStyleName = "rtl-collapsed";
      containerHeight = this.props.tagContainerCollapsedHeight;
      expandText = "Show more...";
    }

    if(this.state.showExpandButton) {
      expandButton = (
        <div className="expand-control-show">
          <div className="expand-button"onClick={this.toggleExpand}>{expandText}</div>
          <div className="show-count">{countText}</div>
        </div>
      );
    }
    else {
      expandButton = (
        <div className="expand-control-hide">
          <div className="expand-button"onClick={this.toggleExpand}>{expandText}</div>
          <div className="show-count">{countText}</div>
        </div>);
    }

    var rtlStyles = {
      height: containerHeight
    };

    return (
      
      <div ref="rtl-container" className="react-tag-list" >
        <div ref="rtl-tags" className={"rtl-tags" + " " + collapsedStyleName} style={rtlStyles}>{tags}</div> 
        {expandButton}    
      </div>
    );
  }
});