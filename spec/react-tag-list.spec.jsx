var React = require('react');
var TestUtils = React.addons.TestUtils;
var ReactTagList = require('../lib/react-tag-list.jsx');


describe("ReactTagList", function() {
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <ReactTagList name="Jonh"/>
    );
  });

  it("should render", function() {
    expect(component.getDOMNode().className).toEqual('react-tag-list');
  });
});
