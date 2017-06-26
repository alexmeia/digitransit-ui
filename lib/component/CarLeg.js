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

function CarLeg(props, context) {
  var distance = displayDistance(parseInt(props.leg.distance, 10), context.config);
  var duration = durationToString(props.leg.duration * 1000);
  var firstLegClassName = props.index === 0 ? 'start' : '';
  var modeClassName = 'car';

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
      React.createElement(RouteNumber, { mode: props.leg.mode.toLowerCase(), vertical: true })
    ),
    React.createElement(ItineraryCircleLine, { index: props.index, modeClassName: modeClassName }),
    React.createElement(
      'div',
      {
        onClick: props.focusAction,
        className: 'small-9 columns itinerary-instruction-column ' + firstLegClassName + ' ' + props.leg.mode.toLowerCase()
      },
      React.createElement(
        'div',
        { className: 'itinerary-leg-first-row' },
        React.createElement(
          'div',
          null,
          props.leg.from.name,
          props.children
        ),
        React.createElement(Icon, { img: 'icon-icon_search-plus', className: 'itinerary-search-icon' })
      ),
      React.createElement(
        'div',
        { className: 'itinerary-leg-action' },
        React.createElement(FormattedMessage, {
          id: 'car-distance-duration',
          values: { distance: distance, duration: duration },
          defaultMessage: 'Drive {distance} ({duration})}'
        })
      )
    )
  );
}

var exampleLeg = function exampleLeg(t1) {
  return {
    duration: 900,
    startTime: t1 + 20000,
    distance: 5678,
    from: { name: 'Ratsukuja', stop: { code: 'E1102' } },
    mode: 'CAR'
  };
};

CarLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary car leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(CarLeg, { leg: exampleLeg(today), index: 0, focusAction: function focusAction() {} })
    )
  );
};

CarLeg.propTypes = {
  leg: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    startTime: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    from: PropTypes.shape({
      name: PropTypes.string.isRequired,
      stop: PropTypes.shape({
        code: PropTypes.string
      })
    }).isRequired,
    mode: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired,
  children: PropTypes.node
};

CarLeg.contextTypes = { config: PropTypes.object.isRequired };

export default CarLeg;