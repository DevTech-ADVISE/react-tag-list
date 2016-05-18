var React = require('react');
var ReactDOM = require('react-dom');
var ReactTagList = require('./lib/react-tag-list.jsx');

var DemoTagList = React.createClass({

	getInitialState: function() {
		return {tags: [],
				tagInputValue: ""};
	},
	removeTag: function(tagValue) {
		var currentTags = this.state.tags;
		var newTags = currentTags.filter(function(tag) {return tag.value !== tagValue;});
		this.setState({tags: newTags});
	},
	removeAllTags: function() {
		this.setState({tags: []});
	},
	addTag: function() {
		var currentTags = this.state.tags;
		var label = ReactDOM.findDOMNode(this.refs.tagInput).value;
		var value = String(label).length + "-" + String(label);

		if(currentTags.filter(function(t) {return t.value === value;}).length > 0)
			return;


		currentTags.push({label: label, value: value});
		this.setState({tags: currentTags});
	},
	handleInputChange: function(event) {
		this.setState({tagInputValue: String(event.target.value)});
	},
	render: function() {
		var tags = this.state.tags;

		return (
			<div>
				<ReactTagList values={tags} onRemove={this.removeTag} removeAll={this.removeAllTags} collapsedRows={1}/>
				<div className="input-tags">
					<input type="text"
					   	 ref="tagInput"
					       placeholder="Type new tag..."/>
					<button onClick={this.addTag}>Add Tag</button>
				</div>
			</div>
		);
	}
});

ReactDOM.render(React.createElement(DemoTagList), document.getElementById('main'));