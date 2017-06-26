import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import ComponentUsageExample from './ComponentUsageExample';

var Card = function Card(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return React.createElement(
    'div',
    { className: cx('card', className) },
    children
  );
};
Card.displayName = 'Card';
Card.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders a card container'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(
        Card,
        { className: 'padding-small' },
        'content of a card'
      )
    )
  );
};

Card.displayName = 'Card';

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Card;