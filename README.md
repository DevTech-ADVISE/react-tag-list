# react-tag-list [![Build Status](https://travis-ci.org/BI/react-tag-list.png)](https://travis-ci.org/BI/react-tag-list)

A "tag list" to illustrate values that are selected, and an api to allow adding and removing these values. This is useful to show things like the state of a filter selector component. This tag list will also intelligently allow you to expand/show more tags when the tag area has become full.  [Demo It](http://BI.github.io/react-tag-list/)

#Properties


* **values**: (Array of Objects each with the label and value properties) These values each become a tag.

* **onRemove**: (function(value)) Called when a tag is clicked.

### Optional:
* **tagContainerCollapsedHeight**: (Number) This is the height in pixels of the tag area when the area is collapsed. Defaults to 55 px.
* **tagContainerExpandedHeight**: (Number) This is the height in pixels of the tag area when the area is expanded. Defaults to 150 px.
* **placeholderText**: (String) What text to show when there are no tags selected.

JSX: 
```js
var tags=[{value: "sweet", label: "Chocolate"},
		  {value: "tart", label: "Strawberry"},
		  {value: "bitter", label: "Lemon"}];

var removeTag = function(tagValue) {
	//update tag values
};

<ReactTagList values={tags} onRemove={removeTag}/>
```

## Development

* Development server `npm run dev`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
