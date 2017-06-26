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

function ViaLeg(props, context) {
  var distance = displayDistance(parseInt(props.leg.distance, 10), context.config);
  var duration = durationToString(props.leg.duration * 1000);
  var stayDuration = durationToString(props.leg.startTime - props.arrivalTime);

  return React.createElement(
    'div',
    { key: props.index, className: 'row itinerary-row' },
    React.createElement(
      'div',
      { className: 'small-2 columns itinerary-time-column via-time-column' },
      React.createElement(
        'div',
        { className: 'itinerary-time-column-time via-arrival-time' },
        moment(props.arrivalTime).format('HH:mm')
      ),
      React.createElement(
        'div',
        { className: 'itinerary-time-column-time via-divider' },
        React.createElement('div', { className: 'via-divider-line' })
      ),
      React.createElement(
        'div',
        { className: 'itinerary-time-column-time via-departure-time' },
        moment(props.leg.startTime).format('HH:mm')
      ),
      React.createElement(RouteNumber, { mode: props.leg.mode.toLowerCase(), vertical: true })
    ),
    React.createElement(ItineraryCircleLine, { isVia: true, index: props.index, modeClassName: 'via' }),
    React.createElement(
      'div',
      {
        onClick: props.focusAction,
        className: 'small-9 columns itinerary-instruction-column via'
      },
      React.createElement(
        'div',
        { className: 'itinerary-leg-first-row' },
        React.createElement(
          'div',
          null,
          props.leg.from.name,
          React.createElement(
            'div',
            { className: 'itinerary-via-leg-duration' },
            React.createElement(FormattedMessage, {
              id: 'via-leg-stop-duration',
              values: { stayDuration: stayDuration },
              defaultMessage: 'At via point {stayDuration}'
            })
          ),
          props.children
        ),
        React.createElement(Icon, { img: 'icon-icon_search-plus', className: 'itinerary-search-icon' })
      ),
      React.createElement(
        'div',
        { className: 'itinerary-leg-action' },
        React.createElement(FormattedMessage, {
          id: 'walk-distance-duration',
          values: { distance: distance, duration: duration },
          defaultMessage: 'Walk {distance} ({duration})'
        })
      )
    )
  );
}

var exampleLeg = function exampleLeg(t1) {
  return {
    duration: 438,
    arrivalTime: t1,
    startTime: t1 + 900000,
    distance: 483.846,
    mode: 'WALK',
    from: { name: 'Messukeskus', stop: { code: '0613' } }
  };
};

ViaLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary via leg. Note that the times are supposed to go on top of the previous leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(ViaLeg, {
        arrivalTime: today,
        leg: exampleLeg(today),
        index: 1,
        focusAction: function focusAction() {}
      })
    )
  );
};

ViaLeg.propTypes = {
  arrivalTime: PropTypes.number.isRequired,
  leg: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    startTime: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    from: PropTypes.shape({
      name: PropTypes.string.isRequired,
      stop: PropTypes.shape({
        code: PropTypes.string
      })
    }).isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  isVia: PropTypes.bool,
  focusAction: PropTypes.func.isRequired,
  children: PropTypes.node
};

ViaLeg.contextTypes = { config: PropTypes.object.isRequired };

export default ViaLeg;