import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import TransitLeg from './TransitLeg';
import ComponentUsageExample from './ComponentUsageExample';

var BusLeg = function BusLeg(_ref) {
  var leg = _ref.leg,
      focusAction = _ref.focusAction,
      index = _ref.index;
  return React.createElement(
    TransitLeg,
    {
      mode: 'BUS',
      leg: leg,
      focusAction: focusAction,
      index: index
    },
    React.createElement(FormattedMessage, {
      id: 'bus-with-route-number',
      values: {
        routeNumber: leg.route && leg.route.shortName,
        headSign: leg.trip && leg.trip.tripHeadsign
      }, defaultMessage: 'Bus {routeNumber} {headSign}'
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
    mode: 'BUS',
    distance: 586.4621425755712,
    duration: 120,
    rentedBike: false,
    intermediateStops: [],
    route: { gtfsId: '123', shortName: '57', mode: 'BUS' },
    trip: { tripHeadsign: 'Kontula', pattern: { code: '1057' } },
    from: { name: 'Ilmattarentie', stop: { code: '2194' } }
  };
};

var exampleLegRealtime = function exampleLegRealtime(t1) {
  return {
    realTime: true,
    transitLeg: true,
    startTime: t1 + 20000,
    endTime: t1 + 30000,
    departureDelay: 100,
    mode: 'BUS',
    distance: 586.4621425755712,
    duration: 120,
    rentedBike: false,
    intermediateStops: [],
    route: { gtfsId: '123', shortName: '57', mode: 'BUS' },
    trip: { tripHeadsign: 'Kontula', pattern: { code: '1057' } },
    from: { name: 'Ilmattarentie', stop: { code: '2194' } }
  };
};

BusLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary bus leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'scheduled' },
      React.createElement(BusLeg, { leg: exampleLeg(today), index: 1, focusAction: function focusAction() {} })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'realtime' },
      React.createElement(BusLeg, { leg: exampleLegRealtime(today), index: 1, focusAction: function focusAction() {} })
    )
  );
};

BusLeg.propTypes = {
  leg: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired
};

export default BusLeg;