import PropTypes from 'prop-types';
import React from 'react';
import ComponentUsageExample from './ComponentUsageExample';
import { displayImperialDistance } from '../util/geo-utils';
import { isImperial } from '../util/browser';

var round = function round(distance) {
  if (distance < 1000) return distance - distance % 10;
  return distance - distance % 100;
};

var Distance = function Distance(props, context) {
  var distance = void 0;
  var roundedDistance = void 0;

  if (props.distance) {
    roundedDistance = round(props.distance);
    if (isImperial(context.config)) {
      distance = displayImperialDistance(props.distance);
    } else if (roundedDistance < 1000) {
      distance = roundedDistance + 'm';
    } else {
      distance = (roundedDistance / 1000).toFixed(1) + 'km';
    }
  } else distance = '';

  return React.createElement(
    'span',
    { className: 'distance' },
    distance
  );
};

Distance.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display distance in correct format. Rounds to 10s of meters or if above 1000 then shows kilometers with one decimal.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'distance is rounded down' },
      React.createElement(Distance, { distance: 7 })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'distance' },
      React.createElement(Distance, { distance: 123 })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'distance in km' },
      React.createElement(Distance, { distance: 3040 })
    )
  );
};

Distance.propTypes = {
  distance: PropTypes.number.isRequired
};

Distance.contextTypes = { config: PropTypes.object.isRequired };

Distance.displayName = 'Distance';

export { Distance as default, round };