import PropTypes from 'prop-types';
import React from 'react';

import ComponentUsageExample from './ComponentUsageExample';

var Centered = function Centered(_ref) {
  var children = _ref.children;
  return React.createElement(
    'div',
    { className: 'centered' },
    React.createElement(
      'div',
      { className: 'centered--item' },
      children
    )
  );
};

Centered.propTypes = {
  children: PropTypes.node.isRequired
};

Centered.displayName = 'Centered';

Centered.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'This component centers other components using flex.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'basic' },
      React.createElement(
        Centered,
        null,
        'Center this'
      )
    )
  );
};

export default Centered;