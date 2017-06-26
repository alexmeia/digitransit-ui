import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import RouteNumber from './RouteNumber';
import ComponentUsageExample from './ComponentUsageExample';
import Icon from './Icon';
import { durationToString } from '../util/timeUtils';
import ItineraryCircleLine from './ItineraryCircleLine';

function WaitLeg(props) {
  var modeClassName = 'wait';
  return React.createElement(
    'div',
    { className: 'row itinerary-row' },
    React.createElement(
      'div',
      { className: 'small-2 columns itinerary-time-column' },
      React.createElement(
        'div',
        { className: 'itinerary-time-column-time' },
        moment(props.startTime).format('HH:mm')
      ),
      React.createElement(RouteNumber, { mode: 'wait', vertical: true })
    ),
    React.createElement(ItineraryCircleLine, { modeClassName: modeClassName, index: props.index }),
    React.createElement(
      'div',
      {
        onClick: props.focusAction,
        className: 'small-9 columns itinerary-instruction-column wait'
      },
      React.createElement(
        'div',
        { className: 'itinerary-leg-first-row' },
        React.createElement(
          'div',
          null,
          props.leg.to.name,
          props.children
        ),
        React.createElement(Icon, { img: 'icon-icon_search-plus', className: 'itinerary-search-icon' })
      ),
      React.createElement(
        'div',
        { className: 'itinerary-leg-action' },
        React.createElement(FormattedMessage, {
          id: 'wait-amount-of-time',
          values: { duration: '(' + durationToString(props.waitTime) + ')' },
          defaultMessage: 'Wait {duration}'
        })
      )
    )
  );
}

var exampleLeg = function exampleLeg() {
  return {
    to: { name: 'Ilmattarentie' }
  };
};

WaitLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  var leg = exampleLeg();
  var duration = moment.duration(17, 'minutes').asMilliseconds();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary wait leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(WaitLeg, { startTime: today, focusAction: function focusAction() {}, waitTime: duration, leg: leg })
    )
  );
};

WaitLeg.propTypes = {
  startTime: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node,
  waitTime: PropTypes.number.isRequired,
  leg: PropTypes.shape({
    to: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default WaitLeg;