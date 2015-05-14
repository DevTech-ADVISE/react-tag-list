var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var ReactTagList = require('../lib/react-tag-list.jsx');
var testData = require('js-test-data');

describe("ReactTagList", function() {
  var component, onRemoveValue;
  var onRemove = function(tagValue) {onRemoveValue = tagValue;};

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <ReactTagList values={testData.Toppings} onRemove={onRemove}/>
    );
  });

  it("should render", function() {
    expect(component.getDOMNode().className).toEqual('react-tag-list');
  });

  it("should render tags with the supplied values", function() {
  	//check that the refs are there
  	expect(component.refs["tag-0"]).toBeDefined();
  	//use the ref to get the dom node
  	expect(component.refs["tag-0"].getDOMNode().getElementsByClassName("rtl-label")[0].innerHTML)
  		  .toEqual(testData.Toppings[0].label);

  });

  it("should call onRemove function when the X button is clicked", function() {
  	//click to remove the first tag
  	TestUtils.Simulate.click(component.refs["tag-0-remove"].getDOMNode());
  	//the onRemove function should be called, and set our onRemoveValue to what value is being removed
  	expect(onRemoveValue).toEqual(testData.Toppings[0].value);
  });
});
