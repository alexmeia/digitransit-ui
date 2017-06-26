import PropTypes from 'prop-types';
import React from 'react';
import mapProps from 'recompose/mapProps';
import { FormattedMessage } from 'react-intl';

import Availability from '../../Availability';
import ComponentUsageExample from '../../ComponentUsageExample';

var ParkAndRideAvailability = mapProps(function (_ref) {
  var realtime = _ref.realtime,
      maxCapacity = _ref.maxCapacity,
      spacesAvailable = _ref.spacesAvailable;
  return {
    available: realtime ? spacesAvailable : 0,
    total: maxCapacity,
    fewAvailableCount: maxCapacity * 0.2,
    text: React.createElement(
      'p',
      { className: 'sub-header-h4 availability-header' },
      React.createElement(FormattedMessage, { id: 'park-and-ride-availability', defaultMessage: 'Spaces available' }),
      '\xA0',
      '(',
      !realtime || isNaN(spacesAvailable) ? '?' : spacesAvailable,
      '/',
      isNaN(maxCapacity) ? 0 : maxCapacity,
      ')'
    )
  };
})(Availability);

ParkAndRideAvailability.displayName = 'ParkAndRideAvailability';

ParkAndRideAvailability.description = React.createElement(
  'div',
  null,
  React.createElement(
    'p',
    null,
    'Renders information about park and ride availability'
  ),
  React.createElement(
    ComponentUsageExample,
    { description: 'non-realtime' },
    React.createElement(ParkAndRideAvailability, { spacesAvailable: 1, maxCapacity: 3 })
  ),
  React.createElement(
    ComponentUsageExample,
    { description: 'realtime' },
    React.createElement(ParkAndRideAvailability, { realtime: true, spacesAvailable: 1, maxCapacity: 3 })
  )
);

ParkAndRideAvailability.propTypes = {
  realtime: PropTypes.bool,
  maxCapacity: PropTypes.number.isRequired,
  spacesAvailable: PropTypes.number.isRequired
};

export default ParkAndRideAvailability;