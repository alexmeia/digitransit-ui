import _typeof from 'babel-runtime/helpers/typeof';
import PropTypes from 'prop-types';
import React from 'react';
import toPairs from 'lodash/toPairs';
import toString from 'lodash/toString';
/*
  Renders the components given as children. In addition a string represenation
  of the given components and its props are given.
  Can be combined with ComponentDocumentation

  usage:
  <ComponentUsageExample description="description of the example">
    <YourComponent foo=bar className="padding-normal"/>
  </ComponentUsageExample>
*/

function getPropStrings(props) {
  return toPairs(props).map(function (_ref) {
    var key = _ref[0],
        value = _ref[1];

    switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
      case 'string':
        if (key !== 'children') {
          return key + '=\'' + value + '\'';
        }
        return '';
      case 'object':
        if (value === null) {
          return key + '={null}';
        }
        if (value.$$typeof) {
          // react component
          return key + '={<' + (value.type.displayName || value.type.name) + '\n            ' + getPropStrings(value.props) + '/>}';
        }
        return key + '={' + getPropStrings(value) + '}';
      default:
        return key + '={' + toString(value) + '}';
    }
  }).join(' ');
}

function getChild(child) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'span',
      { className: 'code' },
      '<' + (child.type.displayName || child.type.name) + ' ' + getPropStrings(child.props) + '/>'
    ),
    React.createElement(
      'div',
      { className: 'component border-dashed' },
      child
    )
  );
}

export default function ComponentUsageExample(_ref2, _ref3) {
  var description = _ref2.description,
      children = _ref2.children;
  var componentOnly = _ref3.componentOnly;

  if (componentOnly) {
    return React.createElement(
      'div',
      { className: 'component-example component-example-large-vertical-padding' },
      React.createElement(
        'div',
        { className: 'component' },
        children
      )
    );
  }

  var wrappedDescription = '';

  if (description) {
    wrappedDescription = React.createElement(
      'p',
      null,
      description
    );
  }

  return React.createElement(
    'div',
    { className: 'component-example padding-vertical-normal' },
    wrappedDescription,
    React.Children.map(children, function (child) {
      return getChild(child);
    })
  );
}

ComponentUsageExample.propTypes = {
  description: PropTypes.node,
  children: PropTypes.node
};

ComponentUsageExample.contextTypes = {
  componentOnly: PropTypes.bool
};