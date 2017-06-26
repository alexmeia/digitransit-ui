import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import RouteNumber from './RouteNumber';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import ItineraryCircleLine from './ItineraryCircleLine';

function AirportCollectLuggageLeg(props) {
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
        moment(props.leg.endTime).format('HH:mm')
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
          id: 'airport-collect-luggage',
          defaultMessage: 'Collect your luggage'
        }),
        React.createElement(Icon, { img: 'icon-icon_search-plus', className: 'itinerary-search-icon' })
      )
    )
  );
}

var exampleLeg = function exampleLeg(t1) {
  return {
    endTime: t1 + 100000
  };
};

AirportCollectLuggageLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary airport collect luggage leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(AirportCollectLuggageLeg, { leg: exampleLeg(today), focusAction: function focusAction() {} })
    )
  );
};

AirportCollectLuggageLeg.propTypes = {
  index: PropTypes.number.isRequired,
  leg: PropTypes.shape({
    endTime: PropTypes.number.isRequired
  }).isRequired,
  focusAction: PropTypes.func.isRequired
};

export default AirportCollectLuggageLeg;