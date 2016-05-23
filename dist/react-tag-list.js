!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports.ReactTagList=e(require("react")):t.ReactTagList=e(t.React)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){var r=n(1),o=n(6),a=n(8),i=n(5),s=n(2);n(10);var l=r.createClass({displayName:"TagList",propTypes:{values:r.PropTypes.array,onRemove:r.PropTypes.func,removeAll:r.PropTypes.func,tagHeight:r.PropTypes.number,collapsedRows:r.PropTypes.number,expandRows:r.PropTypes.number,maximumExpand:r.PropTypes.bool,easyClick:r.PropTypes.bool},mixins:[a],listeners:{window:{resize:"onResize"}},getDefaultProps:function(){return{expandRows:3,maximumExpand:!0,easyClick:!0,placeholderText:"Choose a value below"}},getInitialState:function(){return{expanded:!1,showExpandButton:!1,shownCount:0,rows:0,currentTagHeight:0}},onResize:function(){clearTimeout(this._resizeTimer),this._resizeTimer=setTimeout(this.updateWidth,100)},updateWidth:function(){this.setState({_width:window.innerWidth})},componentDidMount:function(){this.componentDidUpdate()},componentDidUpdate:function(){this.getRows()!==this.state.rows&&this.setState({rows:this.getRows()}),this.getCurrentTagHeight()!==this.state.currentTagHeight&&this.setState({currentTagHeight:this.getCurrentTagHeight()}),this.state.shownCount!==this.getShownCount()&&this.setState({shownCount:this.getShownCount()});var t,e,n;0===this.props.values.length?n=!1:(e="tag-"+String(this.props.values.length-1),t=this.refs[e],n=this.isTagOverflowing(t)),!n&&this.state.showExpandButton?this.setState({showExpandButton:!1,expanded:!1}):n&&!this.state.showExpandButton&&this.setState({showExpandButton:!0})},onRemoveFunc:function(){return this.props.onRemove?this.props.onRemove:function(t){return t}},toggleExpand:function(){var t=this.refs["rtl-container"].getElementsByClassName("rtl-expanded")[0];t&&(t.scrollTop=0),this.setState({expanded:!this.state.expanded,shownCount:this.getShownCount()})},isTagOverflowing:function(t){if(0===this.props.values.length)return!1;var e=this.getBottomOfElement(this.refs["tag-0"])*this.props.collapsedRows;return this.getBottomOfElement(t)>e},removeAllTags:function(){this.setState({showExpandButton:!1},this.props.removeAll)},getShownCount:function(){var t=0;return 0===this.props.values.length?t:(this.props.values.forEach(function(e,n){var r=this.refs["tag-"+n];this.isTagOverflowing(r)||t++},this),t)},getRows:function(){var t=0,e=0;return 0===this.props.values.length?t:(this.props.values.forEach(function(n,r){if(this.refs["tag-"+r]){var o=this.refs["tag-"+r],a=this.getBottomOfElement(o);a>e&&(e=a,t++)}}.bind(this)),t)},getContainerHeight:function(t){return this.state.currentTagHeight*t},getCurrentTagHeight:function(){if(!this.refs["tag-0"])return 0;var t=this.refs["tag-0"];return this.getOuterHeight(t)},getBottomOfElement:function(t){return this.getTopOfElement(t)+this.getOuterHeight(t)},getTopOfElement:function(t){return i(t).top},getOuterHeight:function(t){return o(t)[1]},getExpandButton:function(){if(!this.state.showExpandButton)return r.createElement("li",{className:"expand-control expand-control-hide"});var t,e,n;return this.state.expanded?(t="",e="^",n="Show Less"):(t="+ "+(this.props.values.length-this.state.shownCount),e="...",n="Show More"),r.createElement("li",{className:"expand-control expand-control-show"},r.createElement("button",{onClick:this.toggleExpand,className:"expand-button",title:n},r.createElement("span",{className:"show-count"},t),r.createElement("span",{className:"expand-text"},e)))},render:function(){var t=this.props.values.map(function(t,e){var n=t.labelComponent||t.label;return this.props.easyClick?r.createElement("li",{ref:"tag-"+e,key:"tag-"+e,className:"rtl-tag easy-click"},r.createElement("button",{ref:"tag-"+e+"-remove",className:"rtl-tag-button",name:"clear",value:t.label,onClick:this.onRemoveFunc().bind(null,t.value)},r.createElement("span",{className:"rtl-label strike-label"},n),r.createElement("span",{className:"rtl-remove-button"},"×"))):r.createElement("li",{ref:"tag-"+e,key:"tag-"+e,className:"rtl-tag"},r.createElement("span",{className:"rtl-label"},n),r.createElement("button",{ref:"tag-"+e+"-remove",className:"rtl-remove-button",name:"clear",value:t.label,onClick:this.onRemoveFunc().bind(null,t.value)},"×"))},this);0===t.length&&(t=r.createElement("li",{ref:"tag-0",className:"rtl-placeholder"},this.props.placeholderText));var e;e=this.state.expanded?this.props.maximumExpand?"none":this.getContainerHeight(this.props.expandRows):this.props.collapsedRows?this.getContainerHeight(this.props.collapsedRows):"none";var n={maxHeight:e},o=s("clear-all-control",{"hide-clear-button":0===this.props.values.length}),a=r.createElement("li",{className:o},r.createElement("button",{title:"Clear All",onClick:this.removeAllTags},"×")),i=this.getExpandButton(),l=s("react-tag-list",{"parent-expand":this.state.expanded,"parent-collapse":!this.state.expanded}),c=s("rtl-tags",{"rtl-expanded":this.state.expanded,"parent-collapsed":!this.state.expanded});return r.createElement("div",{ref:"rtl-container",className:l},r.createElement("ul",{ref:"rtl-tags",className:"rtl-tags "+c,style:n},t,a,i))}});t.exports=l},function(e,n){e.exports=t},function(t,e,n){var r,o;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function n(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=typeof r;if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r))t.push(n.apply(null,r));else if("object"===o)for(var i in r)a.call(r,i)&&r[i]&&t.push(i)}}return t.join(" ")}var a={}.hasOwnProperty;"undefined"!=typeof t&&t.exports?t.exports=n:(r=[],o=function(){return n}.apply(e,r),!(void 0!==o&&(t.exports=o)))}()},function(t,e,n){e=t.exports=n(4)(),e.push([t.id,".font,.react-tag-list .rtl-tag{font-family:Arial,Helvetica,sans-serif;font-size:.9em}.react-tag-list,.react-tag-list .expand-control .expand-button,.user-select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.react-tag-list .rtl-label,.user-select-all{-webkit-user-select:all;-moz-user-select:all;-ms-user-select:all;-o-user-select:all;user-select:all}.react-tag-list{position:relative;padding-left:.6em;padding-right:4em}.react-tag-list .rtl-tags{list-style-type:none;overflow:hidden;padding:.6em 0 0 .4em;margin:6px 0;box-sizing:content-box;box-shadow:inset 0 0 2px 0 hsla(0,0%,78%,0);min-height:2.3em}.react-tag-list .rtl-tags.rtl-expanded{overflow:auto;max-height:300px!important;box-shadow:inset 0 0 2px 0 hsla(0,0%,78%,.9)}.react-tag-list .rtl-tag{list-style-type:none;display:inline-block;border:1px solid #d0d0d0;border-radius:3px;background:#fff;padding:0 1.4em 0 0;margin:0 .8em .6em 0;font-size:1em;box-sizing:border-box}.react-tag-list .rtl-tag.easy-click{border:0;padding:0}.react-tag-list .rtl-tag.easy-click .rtl-tag-button{background:#fff;border:1px solid #d0d0d0;padding:0 1.4em 0 0;position:relative;font-size:1em;border-radius:3px;cursor:pointer}.react-tag-list .rtl-tag.easy-click .rtl-tag-button .rtl-remove-button{line-height:1;width:1.1em}.react-tag-list .rtl-tag.easy-click .rtl-tag-button:focus,.react-tag-list .rtl-tag.easy-click .rtl-tag-button:hover{background:#fff;border:1px solid #d0d0d0}.react-tag-list .rtl-tag.easy-click .rtl-tag-button:focus .rtl-remove-button,.react-tag-list .rtl-tag.easy-click .rtl-tag-button:hover .rtl-remove-button{background-color:hsla(0,0%,47%,.2);box-shadow:inset 2px 0 0 0 #fff}.react-tag-list .rtl-tag.easy-click .rtl-tag-button:hover .strike-label{text-decoration:line-through}.react-tag-list .rtl-label{display:inline-block;line-height:1.6em;padding:0 0 0 .5em;position:relative;z-index:1}.react-tag-list .rtl-remove-button{background-color:transparent;color:#e45050;border:0;border-radius:0 3px 3px 0;text-decoration:none;line-height:0;font-weight:700;text-transform:uppercase;position:absolute;z-index:0;top:0;right:0;padding:0;height:100%;width:1.2em;cursor:pointer;font-size:1.2em}.react-tag-list .rtl-remove-button:hover{background-color:hsla(0,0%,47%,.2);box-shadow:inset 2px 0 0 0 #fff}.react-tag-list .rtl-placeholder{font-family:\\.HelveticaNeueDeskInterface-Regular;font-size:1em;margin-left:.5em;padding-left:1px;margin-top:.3em;margin-bottom:.85em;font-style:italic;color:#999}.react-tag-list .clear-all-control{position:absolute;top:.6em;right:2.8em;transition:right 32ms ease-in}.react-tag-list .clear-all-control.hide-clear-button{display:none}.react-tag-list .clear-all-control button{font-size:1.2em;font-weight:700;line-height:.9em;background-color:#f7f7f7;border-radius:.8em;border:1px solid #ccc;cursor:pointer;color:#e45050;position:relative;padding:.1em .4em .4em;text-align:center;box-shadow:inset 2px 2px 2px 0 hsla(0,0%,100%,.7),inset -1px -1px 1px 0 rgba(60,60,60,.1);transition:all .2s ease-out}.react-tag-list .clear-all-control button:hover{border-color:#c9c9c9;box-shadow:inset 1px 1px 1px 0 hsla(0,0%,100%,.7),inset 0 0 1px 0 rgba(0,0,0,.1)}.react-tag-list .clear-all-control button:active{background-color:#fafafa;border-color:#e45050;box-shadow:inset 1px 1px 1px 0 hsla(0,0%,100%,.7),inset 0 0 1px 0 rgba(0,0,0,.1)}.react-tag-list .expand-control{position:absolute;padding:0;top:.6em;bottom:auto;right:.2em;z-index:1;transition:all .3s ease-in-out}.react-tag-list .expand-control.expand-control-show{display:block}.react-tag-list .expand-control.expand-control-hide{display:none}.react-tag-list .expand-control .expand-button{height:1.8em;width:2em;font-size:1em;line-height:.9em;letter-spacing:-.02em;background-color:#eee;border-radius:4px;border:1px solid #ccc;cursor:pointer;color:#555;position:relative;padding:.1em .3em .5em;text-align:center;box-shadow:inset 2px 2px 2px 0 hsla(0,0%,100%,.7),inset -1px -1px 1px 0 rgba(0,0,0,.1);transition:all .2s ease-out}.react-tag-list .expand-control .expand-button:hover{border-color:#c9c9c9;box-shadow:inset 1px 1px 1px 0 hsla(0,0%,100%,.7),inset 0 0 1px 0 rgba(0,0,0,.1)}.react-tag-list .expand-control .expand-button:active{background-color:#fafafa;border-color:#bbb;box-shadow:inset 1px 1px 1px 0 hsla(0,0%,100%,.7),inset 0 0 1px 0 rgba(0,0,0,.1);color:#2d8bee}.react-tag-list .expand-control .expand-button .show-count{font-size:12px;position:absolute;width:100%;letter-spacing:-.1em;white-space:nowrap;display:inline-block;margin-top:-1em;top:1em;left:0}.react-tag-list .expand-control .expand-button .expand-text{font-size:20px}.react-tag-list.parent-expand{padding-right:3em}.react-tag-list.parent-expand .rtl-tags.rtl-expanded:hover{box-shadow:inset 0 0 2px 1px hsla(0,0%,78%,.9)}.react-tag-list.parent-expand .clear-all-control{right:.7em;transition:all 247ms ease-out}.react-tag-list.parent-expand .expand-control{top:auto;bottom:.3em}.react-tag-list.parent-expand .expand-control .expand-button{padding:.35em .4em .15em;border-radius:.2em}.react-tag-list.parent-collapse ul:after{background-color:transparent}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},function(t,e){t.exports=function(t){for(var e=0,n=0;t;)e+=t.offsetLeft-t.scrollLeft+t.clientLeft,n+=t.offsetTop-t.scrollTop+t.clientTop,t=t.offsetParent;return{left:e,top:n}}},function(t,e){function n(t){if(t===window||t===document.body)return[window.innerWidth,window.innerHeight];if(!t.parentNode){var e=!0;document.body.appendChild(t)}var n=t.getBoundingClientRect(),o=getComputedStyle(t),a=(0|n.height)+r(o.getPropertyValue("margin-top"))+r(o.getPropertyValue("margin-bottom")),i=(0|n.width)+r(o.getPropertyValue("margin-left"))+r(o.getPropertyValue("margin-right"));return e&&document.body.removeChild(t),[i,a]}function r(t){return parseFloat(t)||0}t.exports=n},function(t,e){"use strict";function n(t,e){return t===e?0!==t||1/t===1/e:t!==t&&e!==e}function r(t,e){if(n(t,e))return!0;if("object"!=typeof t||null===t||"object"!=typeof e||null===e)return!1;var r=Object.keys(t),a=Object.keys(e);if(r.length!==a.length)return!1;for(var i=0;i<r.length;i++)if(!o.call(e,r[i])||!n(t[r[i]],e[r[i]]))return!1;return!0}var o=Object.prototype.hasOwnProperty;t.exports=r},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t,e,n,r){t.addEventListener?t.addEventListener(e,n,r):t.attachEvent&&t.attachEvent("on"+e,function(){n.call(t)})}function l(t,e,n,r){t.removeEventListener?t.removeEventListener(e,n,r):t.detachEvent&&t.detachEvent("on"+e,n)}function c(t,e){for(var n in t)if("on"===n.substring(0,2)&&t[n]instanceof Function){var r=n.substring(2).toLowerCase();e(r,t[n])}}Object.defineProperty(e,"__esModule",{value:!0});var p=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),d=r(u),f=n(7),h=r(f),g=function(t){function e(){return o(this,e),a(this,Object.getPrototypeOf(e).apply(this,arguments))}return i(e,t),p(e,[{key:"componentDidMount",value:function(){this.addListeners()}},{key:"shouldComponentUpdate",value:function(t){return!(0,h["default"])(this.props,t)}},{key:"componentWillUpdate",value:function(){this.removeListeners()}},{key:"componentDidUpdate",value:function(){this.addListeners()}},{key:"componentWillUnmount",value:function(){this.removeListeners()}},{key:"addListeners",value:function(){var t=this,e=this.props,n=e.capture,r=e.target;r&&!function(){var e=r;"string"==typeof r&&(e=window[r]),c(t.props,function(t,r){return s(e,t,r,n)})}()}},{key:"removeListeners",value:function(){var t=this,e=this.props,n=e.capture,r=e.target;r&&!function(){var e=r;"string"==typeof r&&(e=window[r]),c(t.props,function(t,r){return l(e,t,r,n)})}()}},{key:"render",value:function(){return this.props.children||null}}]),e}(u.Component);g.propTypes={capture:u.PropTypes.bool.isRequired,children:u.PropTypes.node,target:d["default"].PropTypes.oneOfType([d["default"].PropTypes.object,d["default"].PropTypes.string])},g.defaultProps={capture:!1},e["default"]=g},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=f[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(c(r.parts[a],e))}else{for(var i=[],a=0;a<r.parts.length;a++)i.push(c(r.parts[a],e));f[r.id]={id:r.id,refs:1,parts:i}}}}function o(t){for(var e=[],n={},r=0;r<t.length;r++){var o=t[r],a=o[0],i=o[1],s=o[2],l=o[3],c={css:i,media:s,sourceMap:l};n[a]?n[a].parts.push(c):e.push(n[a]={id:a,parts:[c]})}return e}function a(t,e){var n=m(),r=v[v.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),v.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function i(t){t.parentNode.removeChild(t);var e=v.indexOf(t);e>=0&&v.splice(e,1)}function s(t){var e=document.createElement("style");return e.type="text/css",a(t,e),e}function l(t){var e=document.createElement("link");return e.rel="stylesheet",a(t,e),e}function c(t,e){var n,r,o;if(e.singleton){var a=x++;n=b||(b=s(e)),r=p.bind(null,n,a,!1),o=p.bind(null,n,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(e),r=d.bind(null,n),o=function(){i(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),r=u.bind(null,n),o=function(){i(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}function p(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(e,o);else{var a=document.createTextNode(o),i=t.childNodes;i[e]&&t.removeChild(i[e]),i.length?t.insertBefore(a,i[e]):t.appendChild(a)}}function u(t,e){var n=e.css,r=e.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function d(t,e){var n=e.css,r=e.sourceMap;r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([n],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(o),a&&URL.revokeObjectURL(a)}var f={},h=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},g=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),m=h(function(){return document.head||document.getElementsByTagName("head")[0]}),b=null,x=0,v=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=g()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=o(t);return r(n,e),function(t){for(var a=[],i=0;i<n.length;i++){var s=n[i],l=f[s.id];l.refs--,a.push(l)}if(t){var c=o(t);r(c,e)}for(var i=0;i<a.length;i++){var l=a[i];if(0===l.refs){for(var p=0;p<l.parts.length;p++)l.parts[p]();delete f[l.id]}}}};var y=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){var r=n(3);"string"==typeof r&&(r=[[t.id,r,""]]);n(9)(r,{});r.locals&&(t.exports=r.locals)}])});