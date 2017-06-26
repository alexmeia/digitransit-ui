import PropTypes from 'prop-types';
import React from 'react';
import mapProps from 'recompose/mapProps';
import { FormattedMessage } from 'react-intl';

import Availability from './Availability';
import ComponentUsageExample from './ComponentUsageExample';

var CityBikeAvailability = mapProps(function (_ref) {
  var bikesAvailable = _ref.bikesAvailable,
      totalSpaces = _ref.totalSpaces,
      fewAvailableCount = _ref.fewAvailableCount;
  return {
    available: bikesAvailable,
    total: totalSpaces,
    fewAvailableCount: fewAvailableCount,
    text: React.createElement(
      'p',
      { className: 'sub-header-h4 availability-header' },
      React.createElement(FormattedMessage, { id: 'bike-availability', defaultMessage: 'Bikes available at the station right now' }),
      '\xA0',
      '(',
      isNaN(bikesAvailable) ? 0 : bikesAvailable,
      '/',
      isNaN(totalSpaces) ? 0 : totalSpaces,
      ')'
    )
  };
})(Availability);

CityBikeAvailability.displayName = 'CityBikeAvailability';

CityBikeAvailability.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders information about citybike availability'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(CityBikeAvailability, { bikesAvailable: 1, totalSpaces: 3, fewAvailableCount: 3 })
    )
  );
};

CityBikeAvailability.propTypes = {
  bikesAvailable: PropTypes.number.isRequired,
  totalSpaces: PropTypes.number.isRequired,
  fewAvailableCount: PropTypes.number.isRequired
};

export default CityBikeAvailability;