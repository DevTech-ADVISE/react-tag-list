var React = require("react/addons");
var elementSize = require("element-size");
var position = require("dom.position");
require("./react-tag-list.scss");

module.exports = React.createClass({
  propTypes: {
    values: React.PropTypes.array,
    onRemove: React.PropTypes.func,
    tagHeight: React.PropTypes.number,
    collapsedRows: React.PropTypes.number,
    expandRows: React.PropTypes.number,
    maximumExpand: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {expandRows: 3,
            maximumExpand: true};
  },
  getInitialState: function() {
    return {expanded: false, showExpandButton: false, shownCount: 0, rows: 0};
  },
  componentDidUpdate: function() {
    if(this.props.values.length === 0) return;

    //if a row was added, update the state
    if(this.getRows() !== this.state.rows) this.setState({rows: this.getRows()});

    var lastTag, ltRef, isOverflowing;
    ltRef = "tag-" + String(this.props.values.length-1);
    lastTag = this.refs[ltRef].getDOMNode();
    isOverflowing = this.isTagOverflowing(lastTag);

    //show the expand butotn if it was previously not shown, and it should be overflowing
    if(!this.state.showExpandButton && ((isOverflowing && !this.state.expanded) || this.state.expanded))
      this.setState({showExpandButton: true, shownCount: this.getShownCount()});
    //don't show the expand button if it was previously shown, and is in expanded mode
    else if(this.state.showExpandButton && !isOverflowing && !this.state.expanded)
      this.setState({showExpandButton: false, shownCount: this.getShownCount()});

    //if the shown count updated, update the state
    if(this.state.shownCount !== this.getShownCount())
      this.setState({shownCount: this.getShownCount()});
  },
  onRemoveFunc: function() {
    if(this.props.onRemove)
      return this.props.onRemove;
    else
      return function(value) { return value;};
  },
  toggleExpand: function() {
    this.setState({expanded: !this.state.expanded, shownCount: this.getShownCount()});
  },
  isTagOverflowing: function(tagDOMNode) {
    var containerBottom = this.getBottomOfElement(this.refs["rtl-tags"].getDOMNode());
    //check that the top of the last tag is above or below the bottom of the container
    if(this.getBottomOfElement(tagDOMNode) > containerBottom)
      return true;

    return false;
  },
  getShownCount: function() {
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
  getRows: function() {
    //get the tag for each value, add a row to the count when a new max bottom tag is found
    var rowCount = 0, currentMax = 0;
    this.props.values.forEach(function(v, vIndex) {
      if(!this.refs["tag-" + vIndex]) {
        // rowCount ++;
        return;
      }
      var tagDOMNode = this.refs["tag-" + vIndex].getDOMNode();
      var tagBottom = this.getBottomOfElement(tagDOMNode)
      if(tagBottom > currentMax) {
        currentMax = tagBottom;
        rowCount ++;
      }

    }.bind(this));

    return rowCount;
  },
  getContainerHeight: function(rows) {
    //if at least the first tag exists in the dom, use it for 
    if(this.refs["tag-0"])
      var tag = this.refs["tag-0"].getDOMNode();
    else 
      return "auto";
    return this.getOuterHeight(tag) * rows;
  },
  getBottomOfElement: function(selector) {
    //use the global offset top, plus the outerheight to get bottom including padding/margins
    return this.getTopOfElement(selector) + this.getOuterHeight(selector);
  },
  getTopOfElement: function(selector) {
    return position(selector).top;
  }, 
  getOuterHeight: function(selector) {
    return elementSize(selector)[1];
  }, 
  render: function() {

    var tags, containerHeight, expandText, expandButton, parentCollapsedStyleName, collapsedStyleName, countText;

    tags = this.props.values.map(function(value, vIndex) {
      return (
        <li ref={"tag-" + vIndex} key={"tag-" + vIndex} className="rtl-tag">
          <div className="rtl-label">{value.label}</div>
          <button ref={"tag-" + vIndex + "-remove"} className="rtl-remove-button" name="clear" value={value.label} onClick={this.onRemoveFunc().bind(null, value.value)}>X</button>
        </li>
      );
    }.bind(this));

    countText = String(this.state.shownCount) + " of " + this.props.values.length;
    if(this.state.expanded) {
      parentCollapsedStyleName = "parent-expand";
      collapsedStyleName = "rtl-expanded";
      containerHeight = this.props.maximumExpand ? "100%" : this.getContainerHeight(this.props.expandRows);
      expandText = "^";
    }
    else {
      parentCollapsedStyleName = "parent-collapse";
      collapsedStyleName = "rtl-collapsed";
      containerHeight = this.props.collapsedRows ? this.getContainerHeight(this.props.collapsedRows) : "auto";
      expandText = "...";
    }

    if(this.state.showExpandButton) {
      expandButton = (
        <div className="expand-control expand-control-show" onClick={this.toggleExpand}>
          <div className="show-count">{countText}</div>
          <div className="expand-button">{expandText}</div>
        </div>
      );
    }
    else {
      expandButton = (
        <div className="expand-control expand-control-hide" onClick={this.toggleExpand}>
          <div className="show-count">{String(this.state.shownCount) + " of " + this.props.values.length}</div>
          <div className="expand-button"onClick={this.toggleExpand}>{expandText}</div>
        </div>);
    }

    var rtlStyles = {
      height: containerHeight
    };

    return (      
      <ul ref="rtl-container" className={"react-tag-list" + " " + parentCollapsedStyleName}>
        <div ref="rtl-tags" className={"rtl-tags" + " " + collapsedStyleName} style={rtlStyles}>{tags}</div> 
        {expandButton}    
      </ul>
    );
  }
});