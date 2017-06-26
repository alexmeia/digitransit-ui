import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import RouteNumber from './RouteNumber';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import ItineraryCircleLine from './ItineraryCircleLine';

function AirportCheckInLeg(props) {
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
    React.createElement(ItineraryCircleLine, { index: props.index, modeClassName: modeClassName }),
    React.createElement(
      'div',
      {
        onClick: props.focusAction,
        className: 'small-9 columns itinerary-instruction-column wait'
      },
      React.createElement(
        'div',
        { className: 'itinerary-leg-first-row' },
        React.createElement(FormattedMessage, {
          id: 'airport-check-in',
          values: { agency: props.leg.agency && props.leg.agency.name },
          defaultMessage: 'Check-in at the {agency} desk'
        }),
        React.createElement(Icon, { img: 'icon-icon_search-plus', className: 'itinerary-search-icon' })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(FormattedMessage, {
          id: 'airport-security-check-go-to-gate',
          defaultMessage: 'Proceed to your gate through security check'
        })
      )
    )
  );
}

var exampleLeg = function exampleLeg() {
  return {
    agency: { name: 'Finnair' }
  };
};

AirportCheckInLeg.description = function () {
  var startTime = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary airport check-in leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(AirportCheckInLeg, { leg: exampleLeg(), startTime: startTime, focusAction: function focusAction() {} })
    )
  );
};

AirportCheckInLeg.propTypes = {
  leg: PropTypes.shape({
    agency: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired,
  startTime: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default AirportCheckInLeg;