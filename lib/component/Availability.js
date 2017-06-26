import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import ComponentUsageExample from './ComponentUsageExample';

function Availability(_ref) {
  var total = _ref.total,
      available = _ref.available,
      fewAvailableCount = _ref.fewAvailableCount,
      text = _ref.text;

  var availablepct = available / total * 100;

  var availableClass = void 0;

  if (availablepct === 0) {
    availableClass = 'available-none';
  } else if (available <= fewAvailableCount) {
    availableClass = 'available-few';
  } else {
    availableClass = 'available-more';
  }

  var totalClass = availablepct === 100 ? 'available-more' : 'available-none';

  var separator = availablepct > 0 && availablepct < 100 ? 'separate' : false;

  if (availablepct < 5) {
    availablepct = 5;
  }

  if (availablepct > 95) {
    availablepct = 95;
  }

  return React.createElement(
    'div',
    { className: 'availability-container' },
    text,
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('div', {
        className: cx('availability-column', availableClass, separator),
        style: { width: availablepct + '%' }
      }),
      React.createElement('div', {
        className: cx('availability-column', totalClass, separator),
        style: { width: 100 - availablepct + '%' }
      })
    )
  );
}

Availability.displayName = 'Availability';

Availability.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders information about availability'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(Availability, { available: 1, total: 3, fewAvailableCount: 3, text: 'Bikes available' })
    )
  );
};

Availability.propTypes = {
  available: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  fewAvailableCount: PropTypes.number.isRequired,
  text: PropTypes.node.isRequired
};

export default Availability;