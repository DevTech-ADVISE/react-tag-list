var React = require('react');
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
	addTag: function(tag) {
		var currentTags = this.state.tags;
		if(currentTags.filter(function(t) {return t.value === tag.value;}).length > 0)
			return;

		currentTags.push({label: tag.label, value: tag.value});
		this.setState({tags: currentTags});
	},
	handleInputChange: function(event) {
		this.setState({tagInputValue: String(event.target.value)});
	},
	render: function() {
		var tags = this.state.tags;
		var tagInput = this.state.tagInputValue;
		var addValue =  String(tagInput).length + "-" + String(tagInput);

		return (
			<div>
				<ReactTagList values={tags} onRemove={this.removeTag}/>
				<div className="input-tags">
					<input type="text"
						   onChange={this.handleInputChange}
					       placeholder="Type new tag..."
					   	   value={tagInput} />
					<button onClick={this.addTag.bind(this, {label: tagInput, value: addValue})}>Add Tag</button>
				</div>
			</div>
		);
	}
});

React.render(React.createElement(DemoTagList), document.getElementById('main'));