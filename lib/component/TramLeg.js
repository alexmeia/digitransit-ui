import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import TransitLeg from './TransitLeg';
import ComponentUsageExample from './ComponentUsageExample';

var TramLeg = function TramLeg(_ref) {
  var leg = _ref.leg,
      focusAction = _ref.focusAction,
      index = _ref.index;
  return React.createElement(
    TransitLeg,
    {
      mode: 'TRAM',
      leg: leg,
      focusAction: focusAction,
      index: index
    },
    React.createElement(FormattedMessage, {
      id: 'tram-with-route-number',
      values: {
        routeNumber: leg.route && leg.route.shortName,
        headSign: leg.trip && leg.trip.tripHeadsign
      }, defaultMessage: 'Tram {routeNumber} {headSign}'
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
    mode: 'TRAM',
    distance: 586.4621425755712,
    duration: 120,
    rentedBike: false,
    intermediateStops: [],
    route: { gtfsId: '123', shortName: '9', mode: 'TRAM' },
    trip: { tripHeadsign: 'Länsiterminaali T2', pattern: { code: '123' } },
    from: { name: 'Simonkatu', stop: { code: '0232' } }
  };
};

TramLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary tram leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(TramLeg, { leg: exampleLeg(today), index: 1, focusAction: function focusAction() {} })
    )
  );
};

TramLeg.propTypes = {
  leg: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired
};

export default TramLeg;