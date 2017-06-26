import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';

function EndLeg(props) {
  var modeClassName = 'end';
  return React.createElement(
    'div',
    { key: props.index, className: 'row itinerary-row' },
    React.createElement(
      'div',
      { className: 'small-2 columns itinerary-time-column' },
      React.createElement(
        'div',
        { className: 'itinerary-time-column-time' },
        moment(props.endTime).format('HH:mm')
      )
    ),
    React.createElement(
      'div',
      { className: 'leg-before ' + modeClassName },
      React.createElement('div', { className: 'leg-before-circle circle ' + modeClassName }),
      React.createElement(
        'div',
        { className: 'itinerary-icon-container' },
        React.createElement(Icon, { img: 'icon-icon_mapMarker-point', className: 'itinerary-icon to to-it' })
      )
    ),
    React.createElement(
      'div',
      { onClick: props.focusAction, className: 'small-9 columns itinerary-instruction-column to end' },
      React.createElement(
        'div',
        { className: 'itinerary-leg-first-row' },
        React.createElement(
          'div',
          null,
          props.to
        ),
        React.createElement(Icon, { img: 'icon-icon_search-plus', className: 'itinerary-search-icon' })
      )
    )
  );
}

EndLeg.description = function () {
  var endTime = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary end leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(EndLeg, { endTime: endTime, to: 'Veturitie', index: 3, focusAction: function focusAction() {} })
    )
  );
};

EndLeg.propTypes = {
  endTime: PropTypes.number.isRequired,
  to: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired
};

export default EndLeg;