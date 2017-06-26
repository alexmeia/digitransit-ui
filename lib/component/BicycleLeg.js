import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import RouteNumber from './RouteNumber';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';

import { displayDistance } from '../util/geo-utils';
import { durationToString } from '../util/timeUtils';
import ItineraryCircleLine from './ItineraryCircleLine';

function BicycleLeg(props, context) {
  var stopsDescription = void 0;
  var distance = displayDistance(parseInt(props.leg.distance, 10), context.config);
  var duration = durationToString(props.leg.duration * 1000);
  var mode = props.leg.mode;

  var legDescription = React.createElement(
    'span',
    null,
    props.leg.from.name
  );
  var firstLegClassName = props.index === 0 ? 'start' : '';
  var modeClassName = 'bicycle';

  if (props.leg.mode === 'WALK' || props.leg.mode === 'BICYCLE_WALK') {
    stopsDescription = React.createElement(FormattedMessage, {
      id: 'cyclewalk-distance-duration',
      values: { distance: distance, duration: duration },
      defaultMessage: 'Walk your bike {distance} ({duration})'
    });
  } else {
    stopsDescription = React.createElement(FormattedMessage, {
      id: 'cycle-distance-duration',
      values: { distance: distance, duration: duration },
      defaultMessage: 'Cycle {distance} ({duration})'
    });
  }

  if (props.leg.rentedBike === true) {
    modeClassName = 'citybike';
    legDescription = React.createElement(FormattedMessage, {
      id: 'rent-cycle-at',
      values: { station: props.leg.from.name },
      defaultMessage: 'Rent a bike at {station} station'
    });

    if (props.leg.mode === 'BICYCLE') {
      mode = 'CITYBIKE';
    }

    if (props.leg.mode === 'WALK') {
      mode = 'CITYBIKE_WALK';
    }
  }

  return React.createElement(
    'div',
    { key: props.index, className: 'row itinerary-row' },
    React.createElement(
      'div',
      { className: 'small-2 columns itinerary-time-column' },
      React.createElement(
        'div',
        { className: 'itinerary-time-column-time' },
        moment(props.leg.startTime).format('HH:mm')
      ),
      React.createElement(RouteNumber, { mode: mode, vertical: true })
    ),
    React.createElement(ItineraryCircleLine, { index: props.index, modeClassName: modeClassName }),
    React.createElement(
      'div',
      {
        onClick: props.focusAction,
        className: 'small-9 columns itinerary-instruction-column ' + firstLegClassName + ' ' + mode.toLowerCase()
      },
      React.createElement(
        'div',
        { className: 'itinerary-leg-first-row' },
        legDescription,
        React.createElement(Icon, { img: 'icon-icon_search-plus', className: 'itinerary-search-icon' })
      ),
      React.createElement(
        'div',
        { className: 'itinerary-leg-action' },
        stopsDescription
      )
    )
  );
}

var exampleLeg = function exampleLeg(t1) {
  return {
    duration: 120,
    startTime: t1 + 20000,
    distance: 586.4621425755712,
    from: { name: 'Ilmattarentie' },
    mode: 'BICYCLE',
    rentedBike: false
  };
};

var exampleLegWalkingBike = function exampleLegWalkingBike(t1) {
  return {
    duration: 120,
    startTime: t1 + 20000,
    distance: 586.4621425755712,
    from: { name: 'Ilmattarentie' },
    mode: 'BICYCLE_WALK',
    rentedBike: false
  };
};

var exampleLegCitybike = function exampleLegCitybike(t1) {
  return {
    duration: 120,
    startTime: t1 + 20000,
    distance: 586.4621425755712,
    from: { name: 'Ilmattarentie' },
    mode: 'BICYCLE',
    rentedBike: true
  };
};

var exampleLegCitybikeWalkingBike = function exampleLegCitybikeWalkingBike(t1) {
  return {
    duration: 120,
    startTime: t1 + 20000,
    distance: 586.4621425755712,
    from: { name: 'Ilmattarentie' },
    mode: 'WALK',
    rentedBike: true
  };
};

BicycleLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary bicycle leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'bicycle-leg-normal' },
      React.createElement(BicycleLeg, { leg: exampleLeg(today), index: 0, focusAction: function focusAction() {} })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'bicycle-leg-walking-bike' },
      React.createElement(BicycleLeg, { leg: exampleLegWalkingBike(today), index: 0, focusAction: function focusAction() {} })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'bicycle-leg-citybike' },
      React.createElement(BicycleLeg, { leg: exampleLegCitybike(today), index: 0, focusAction: function focusAction() {} })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'bicycle-leg-citybike-walking-bike' },
      React.createElement(BicycleLeg, { leg: exampleLegCitybikeWalkingBike(today), index: 1, focusAction: function focusAction() {} })
    )
  );
};

BicycleLeg.propTypes = {
  leg: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    startTime: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    from: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    mode: PropTypes.string.isRequired,
    rentedBike: PropTypes.bool.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired
};

BicycleLeg.contextTypes = { config: PropTypes.object.isRequired };

export default BicycleLeg;