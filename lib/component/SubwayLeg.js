import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import TransitLeg from './TransitLeg';
import ComponentUsageExample from './ComponentUsageExample';

var SubwayLeg = function SubwayLeg(_ref) {
  var leg = _ref.leg,
      focusAction = _ref.focusAction,
      index = _ref.index;
  return React.createElement(
    TransitLeg,
    {
      mode: 'SUBWAY',
      leg: leg,
      focusAction: focusAction,
      index: index
    },
    React.createElement(FormattedMessage, {
      id: 'subway-with-route-number',
      values: {
        routeNumber: leg.route && leg.route.shortName,
        headSign: leg.trip && leg.trip.tripHeadsign
      },
      defaultMessage: 'Metro {routeNumber} {headSign}'
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
    mode: 'SUBWAY',
    distance: 586.4621425755712,
    duration: 120,
    rentedBike: false,
    intermediateStops: [],
    route: { gtfsId: '123', shortName: 'M2', mode: 'SUBWAY' },
    trip: { tripHeadsign: 'Tapiola', pattern: { code: '123' } },
    from: { name: 'Mellunmäki', stop: { code: 'M2' } }
  };
};

SubwayLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary subway leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(SubwayLeg, { leg: exampleLeg(today), index: 1, focusAction: function focusAction() {} })
    )
  );
};

SubwayLeg.propTypes = {
  leg: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired
};

export default SubwayLeg;