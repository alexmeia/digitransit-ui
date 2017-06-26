import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import TransitLeg from './TransitLeg';
import ComponentUsageExample from './ComponentUsageExample';

var FerryLeg = function FerryLeg(_ref) {
  var leg = _ref.leg,
      focusAction = _ref.focusAction,
      index = _ref.index;
  return React.createElement(
    TransitLeg,
    {
      mode: 'FERRY',
      leg: leg,
      focusAction: focusAction,
      index: index
    },
    React.createElement(FormattedMessage, {
      id: 'ferry-with-route-number',
      values: {
        routeNumber: leg.route && leg.route.shortName,
        headSign: leg.trip && leg.trip.tripHeadsign
      },
      defaultMessage: 'Ferry {routeNumber} {headSign}'
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
    mode: 'FERRY',
    distance: 586.4621425755712,
    duration: 900,
    rentedBike: false,
    intermediateStops: [],
    route: { gtfsId: '123', shortName: '19', mode: 'FERRY' },
    trip: { tripHeadsign: 'Suomenlinna, päälait', pattern: { code: '123' } },
    from: { name: 'Kauppatori', stop: { code: '0099' } }
  };
};

FerryLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary ferry leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(FerryLeg, { leg: exampleLeg(today), index: 1, focusAction: function focusAction() {} })
    )
  );
};

FerryLeg.propTypes = {
  leg: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired
};
export default FerryLeg;