import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import TransitLeg from './TransitLeg';
import ComponentUsageExample from './ComponentUsageExample';

var RailLeg = function RailLeg(_ref) {
  var leg = _ref.leg,
      focusAction = _ref.focusAction,
      index = _ref.index;
  return React.createElement(
    TransitLeg,
    {
      mode: 'RAIL',
      leg: leg,
      focusAction: focusAction,
      index: index
    },
    React.createElement(FormattedMessage, {
      id: 'train-with-route-number',
      values: {
        routeNumber: leg.route && leg.route.shortName,
        headSign: leg.trip && leg.trip.tripHeadsign
      },
      defaultMessage: 'Train {routeNumber} {headSign}'
    })
  );
};

var exampleLeg = function exampleLeg(t1) {
  return {
    realTime: false,
    transitLeg: true,
    startTime: t1 + 20000,
    endTime: t1 + 30000,
    departureDelay: 100,
    mode: 'RAIL',
    distance: 586.4621425755712,
    duration: 120,
    rentedBike: false,
    intermediateStops: [],
    route: { gtfsId: '123', shortName: 'P', mode: 'RAIL' },
    trip: { tripHeadsign: 'Helsinki', pattern: { code: '123' } },
    from: { name: 'Käpylä', stop: { code: '0072' } }
  };
};

RailLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary rail leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(RailLeg, { leg: exampleLeg(today), index: 1, focusAction: function focusAction() {} })
    )
  );
};

RailLeg.propTypes = {
  leg: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired
};

export default RailLeg;