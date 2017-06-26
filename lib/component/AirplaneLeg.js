import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import TransitLeg from './TransitLeg';
import ComponentUsageExample from './ComponentUsageExample';

var AirplaneLeg = function AirplaneLeg(_ref) {
  var leg = _ref.leg,
      focusAction = _ref.focusAction,
      index = _ref.index;
  return React.createElement(
    TransitLeg,
    {
      mode: 'AIRPLANE',
      leg: leg,
      focusAction: focusAction,
      index: index
    },
    React.createElement(FormattedMessage, {
      id: 'airplane-with-route-number',
      values: {
        routeNumber: leg.route && leg.route.shortName
      },
      defaultMessage: 'Flight {routeNumber}'
    })
  );
};

AirplaneLeg.propTypes = {
  leg: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired
};

var exampleLeg = function exampleLeg(t1) {
  return {
    realTime: false,
    transitLeg: true,
    startTime: t1 + 20000,
    endTime: t1 + 30000,
    departureDelay: 100,
    mode: 'AIRPLANE',
    distance: 586.4621425755712,
    duration: 120,
    rentedBike: false,
    intermediateStops: [],
    route: { gtfsId: '123', shortName: 'AY447', mode: 'AIRPLANE' },
    trip: { tripHeadsign: 'Kittila', pattern: { code: 'AY447' } },
    from: { name: 'Helsingin lentoasema', stop: { code: 'HEL' } }
  };
};

AirplaneLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary airplane leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(AirplaneLeg, { leg: exampleLeg(today), index: 1, focusAction: function focusAction() {} })
    )
  );
};

export default AirplaneLeg;