import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import ComponentUsageExample from './ComponentUsageExample';

var Labeled = function Labeled(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick,
      className = _ref.className,
      label = _ref.label,
      showLabel = _ref.showLabel;
  return React.createElement(
    'span',
    {
      className: cx(onClick ? 'cursor-pointer' : undefined, 'labeled', className),
      onClick: onClick
    },
    React.createElement(
      'div',
      { className: 'labeled-item' },
      children
    ),
    showLabel ? React.createElement(
      'div',
      { className: 'labeled-label' },
      label
    ) : undefined
  );
};

Labeled.propTypes = {
  label: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  showLabel: PropTypes.bool,
  className: PropTypes.string
};

var exampleLabel = React.createElement(
  'span',
  null,
  'Example label'
);

Labeled.displayName = 'Labeled';

Labeled.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'This component wraps other components into a labeled component.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(
        Labeled,
        { label: exampleLabel, showLabel: true },
        'Example content'
      )
    )
  );
};

export default Labeled;