import PropTypes from 'prop-types';
import React from 'react';
import ComponentUsageExample from './ComponentUsageExample';

function RouteScheduleTripRow(props) {
  return React.createElement(
    'div',
    { className: 'row' },
    React.createElement(
      'div',
      { className: 'trip-column' },
      React.createElement(
        'div',
        { className: 'trip-from trip-label left' },
        props.departureTime
      ),
      React.createElement('div', { className: 'trip-separator' }),
      React.createElement(
        'div',
        { className: 'trip-to trip-label right text-right' },
        props.arrivalTime
      )
    )
  );
}
RouteScheduleTripRow.propTypes = {
  departureTime: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired
};

RouteScheduleTripRow.displayName = 'RouteScheduleTripRow';

RouteScheduleTripRow.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display a route schedule row using react components'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(RouteScheduleTripRow, {
        departureTime: '08:12',
        arrivalTime: '08:12'
      })
    )
  );
};

export default RouteScheduleTripRow;