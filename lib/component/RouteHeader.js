import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import RouteNumber from './RouteNumber';

export default function RouteHeader(props) {
  var mode = props.route.mode.toLowerCase();

  var trip = props.trip ? React.createElement(
    'span',
    { className: 'route-header-trip' },
    props.trip.substring(0, 2),
    ':',
    props.trip.substring(2, 4),
    ' \u2192'
  ) : '';

  var routeLineText = ' ' + (props.route.shortName || '');

  var routeLine = props.trip && props.pattern ? React.createElement(
    Link,
    { to: '/linjat/' + props.route.gtfsId + '/pysakit/' + props.pattern.code },
    routeLineText
  ) : routeLineText;

  return React.createElement(
    'div',
    { className: cx('route-header', props.className) },
    React.createElement(
      'h1',
      { className: mode },
      React.createElement(RouteNumber, { mode: mode, text: routeLine }),
      trip
    )
  );
}

RouteHeader.propTypes = {
  route: PropTypes.shape({
    gtfsId: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    shortName: PropTypes.string
  }).isRequired,
  trip: PropTypes.string,
  pattern: PropTypes.shape({ code: PropTypes.string.isRequired }),
  className: PropTypes.string
};