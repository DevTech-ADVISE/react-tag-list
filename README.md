# react-tag-list

Get the AMD module located at `react-tag-list.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'ReactTagList': 'react-tag-list'
  }
});

require(['react', 'ReactTagList'], function(React, ReactTagList) {

  React.render(React.createElement(ReactTagList), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm run dev`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
