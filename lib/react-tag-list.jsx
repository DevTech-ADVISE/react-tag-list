var React = require("react/addons");
var elementSize = require("element-size");
var EventsMixin = require('react-event-listener');
var position = require("dom.position");
require("./react-tag-list.scss");

var TagList = React.createClass({
  propTypes: {
    values: React.PropTypes.array,
    onRemove: React.PropTypes.func,
    removeAll: React.PropTypes.func,
    tagHeight: React.PropTypes.number,
    collapsedRows: React.PropTypes.number,
    expandRows: React.PropTypes.number,
    maximumExpand: React.PropTypes.bool,
    easyClick: React.PropTypes.bool
  },
  mixins: [EventsMixin],
  listeners: {
    window: {
      resize: 'onResize'
    }
  },
  getDefaultProps: function() {
    return {expandRows: 3,
            maximumExpand: true, 
            easyClick: true,
            placeholderText: "Choose a value below"};
  },
  getInitialState: function() {
    return {expanded: false, showExpandButton: false, shownCount: 0, rows: 0, currentTagHeight: 0};
  },

  onResize: function() {
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this.updateWidth, 100);
  },

  updateWidth: function() {
    this.setState({ _width: window.innerWidth});
  },

  componentDidUpdate: function() {
    //if a row was added, update the state
    if(this.getRows() !== this.state.rows) 
      this.setState({rows: this.getRows()});

    //if the current tag height has changed, rerender because calculations are based off of that tag height
    if(this.getCurrentTagHeight() !== this.state.currentTagHeight) 
      this.setState({currentTagHeight: this.getCurrentTagHeight()});

    //if the shown count updated, update the state
    if(this.state.shownCount !== this.getShownCount())
      this.setState({shownCount: this.getShownCount()});

    var lastTag, ltRef, isOverflowing;
    //when there are no tags it is not overflowing
    if(this.props.values.length === 0)
      isOverflowing = false;
    else {
      ltRef = "tag-" + String(this.props.values.length-1);
      lastTag = this.refs[ltRef].getDOMNode();
      isOverflowing = this.isTagOverflowing(lastTag);
    }

    //check that tags are not overflowing over the collapsed height
    //check that showExpandButton was previously true to avoid an infinite render loop
    //then set showExpandButton to false since it is not needed to be shown
    if(!isOverflowing && this.state.showExpandButton)
      this.setState({showExpandButton: false, expanded: false});
    //check that tags are overflowing
    //check that showExpandButton was previously false to avoid infinite render loop
    //then set showExpandButton to true so we can expand to show overflow
    else if(isOverflowing && !this.state.showExpandButton)
      this.setState({showExpandButton: true});

  },
  onRemoveFunc: function() {
    if(this.props.onRemove)
      return this.props.onRemove;
    else
      return function(value) { return value;};
  },
  toggleExpand: function() {
    var expandedTagContainer = this.getDOMNode().getElementsByClassName("rtl-expanded")[0];
      if(expandedTagContainer)
        expandedTagContainer.scrollTop = 0;

      this.setState({expanded: !this.state.expanded, shownCount: this.getShownCount()});
  },
  isTagOverflowing: function(tagDOMNode) {
    if(this.props.values.length === 0) return false;
    //over flow is determined if any tags are below the collapsed container 
    //also overflow will be false if there are no tags
    var collapsedBottom = this.getBottomOfElement(this.refs["tag-0"].getDOMNode()) * this.props.collapsedRows;

    //check that the top of the last tag is above or below the bottom of the container
    if(this.getBottomOfElement(tagDOMNode) > collapsedBottom)
      return true;

    return false;
  },
  removeAllTags: function() {
    
    this.setState({showExpandButton: false}, this.props.removeAll);
  },
  getShownCount: function() {
    //go through all values, get each ref element, 
    //and check if the bottom of it is overlapped by the bottom of the collapsed tag container 
    var shownCount = 0;
    if(this.props.values.length === 0) return shownCount;

    this.props.values.forEach(function(v, vIndex) {
      var tagDOMNode = this.refs["tag-" + vIndex].getDOMNode();
      if(this.isTagOverflowing(tagDOMNode))
        return; //continue to next tag
      else
        shownCount ++;
    }, this);

    return shownCount;

  },
  getRows: function() {
    //get the tag for each value, add a row to the count when a new max bottom tag is found
    var rowCount = 0, currentMax = 0;
    if(this.props.values.length === 0) return rowCount;

    this.props.values.forEach(function(v, vIndex) {
      if(!this.refs["tag-" + vIndex]) {
        return;
      }
      var tagDOMNode = this.refs["tag-" + vIndex].getDOMNode();
      var tagBottom = this.getBottomOfElement(tagDOMNode);
      if(tagBottom > currentMax) {
        currentMax = tagBottom;
        rowCount ++;
      }

    }.bind(this));

    return rowCount;
  },
  getContainerHeight: function(rows) {
    return this.state.currentTagHeight * rows;
  },
  getCurrentTagHeight: function() {
    if(!this.refs["tag-0"])
      return 0;

    var tag = this.refs["tag-0"].getDOMNode();
    return this.getOuterHeight(tag);
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

    var tags, containerHeight, expandText, expandButton, parentClassName = "react-tag-list",
      collapsedStyleName, countText, showMoreTitle, clearAllButton, clearAllClass;
    
    if(this.props.values.length === 0)
      clearAllClass = "clear-all-control hide-clear-button";
    else
      clearAllClass = "clear-all-control";

    tags = this.props.values.map(function(value, vIndex) {
      var label = value.labelComponent || value.label;
      if(this.props.easyClick) {
        return (
          <li ref={"tag-" + vIndex} key={"tag-" + vIndex} className="rtl-tag easy-click">
            <button ref={"tag-" + vIndex + "-remove"} className="rtl-tag-button" name="clear" value={value.label}  onClick={this.onRemoveFunc().bind(null, value.value)}>
              <span className="rtl-label strike-label">{label}</span>
              <span className="rtl-remove-button">&#215;</span>
            </button>
          </li>
        );
      }
      else {
        return (
          <li ref={"tag-" + vIndex} key={"tag-" + vIndex} className="rtl-tag">
            <span className="rtl-label">{label}</span>
            <button ref={"tag-" + vIndex + "-remove"} className="rtl-remove-button" name="clear" value={value.label} onClick={this.onRemoveFunc().bind(null, value.value)}>&#215;</button>
          </li>
        );
      }
      
    }, this);

    if(tags.length === 0) {
      tags = (<li className="rtl-placeholder">{this.props.placeholderText}</li>);
    }

    if(this.state.expanded) {
      parentClassName += " parent-expand";
      collapsedStyleName = "rtl-expanded";
      containerHeight = this.props.maximumExpand ? "none" : this.getContainerHeight(this.props.expandRows);
      expandText = "^";
    }
    else {
      parentClassName += " parent-collapse";
      collapsedStyleName = "rtl-collapsed";
      containerHeight = this.props.collapsedRows ? this.getContainerHeight(this.props.collapsedRows) : "none";
      expandText = "...";
    }

    if(this.state.showExpandButton) {
      if(this.state.expanded) {
        countText = "";
        showMoreTitle = "Show Less";
      }
      else {
        countText = "+ " + (this.props.values.length - this.state.shownCount);
        showMoreTitle = "Show More";
      }

      expandButton = (
        <li className="expand-control expand-control-show">
          <button onClick={this.toggleExpand} className="expand-button" title={showMoreTitle}>
            <span className="show-count">{countText}</span>
            <span className="expand-text">{expandText}</span>
          </button>
        </li>
      );
    } else {
      expandButton = (
        <li className="expand-control expand-control-hide">
        </li>);
    }

    clearAllButton = <li className={clearAllClass}><button title="Clear All" onClick={this.removeAllTags}>&#215;</button></li>;


    var rtlStyles = {
      maxHeight: containerHeight
    };

    return (      
      <div ref="rtl-container" className={parentClassName}>
        <ul ref="rtl-tags" className={"rtl-tags" + " " + collapsedStyleName} style={rtlStyles}>
          {tags} 
          {clearAllButton}
          {expandButton}
        </ul>
      </div>
    );
  }
});

module.exports = TagList;