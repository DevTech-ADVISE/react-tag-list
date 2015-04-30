var React = require('react');
var ReactTagList = require('./lib/react-tag-list.jsx');

var DemoTagList = React.createClass({

	render: function() {
		return (
			<ReactTagList values={["chocolate", "starfish", "strawberry"]}/>
		);
	}
});

React.render(React.createElement(DemoTagList), document.getElementById('main'));