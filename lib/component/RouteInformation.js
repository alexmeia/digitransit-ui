import React from 'react';
import { FormattedMessage } from 'react-intl';

var RouteInformation = function RouteInformation() {
  return React.createElement(
    'div',
    { className: 'itinerary-route-information row' },
    React.createElement(
      'div',
      { className: 'small-6 columns' },
      React.createElement(FormattedMessage, { id: 'weather-at-destination', defaultMessage: 'Weather at the destination' })
    ),
    React.createElement(
      'div',
      { className: 'small-6 columns noborder' },
      React.createElement(FormattedMessage, { id: 'trip-co2-emissions', defaultMessage: 'CO2 emissions of the journey' })
    )
  );
};

export default RouteInformation;