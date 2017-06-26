import PropTypes from 'prop-types';
import React from 'react';
import ComponentUsageExample from './ComponentUsageExample';

var SplitBars = function SplitBars(_ref) {
  var children = _ref.children;

  var splits = [];
  children.forEach(function (child) {
    splits.push(React.createElement(
      'div',
      { className: 'split-bar' },
      child
    ));
    splits.push(React.createElement('div', { className: 'split-bar--bar' }));
  });
  splits = splits.splice(0, splits.length - 1);
  return React.createElement(
    'div',
    { className: 'split-bars' },
    splits
  );
};

SplitBars.displayName = 'SplitBars';

SplitBars.propTypes = {
  children: PropTypes.node.isRequired
};

SplitBars.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Splits its children with a vertical bar.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(
        SplitBars,
        null,
        React.createElement(
          'span',
          null,
          '1'
        ),
        React.createElement(
          'span',
          null,
          '2'
        ),
        React.createElement(
          'span',
          null,
          '3'
        )
      )
    )
  );
};

export default SplitBars;