import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import RouteNumberContainer from './RouteNumberContainer';
import RouteDestination from './RouteDestination';
import DepartureTime from './DepartureTime';
import PlatformNumber from './PlatformNumber';
import ComponentUsageExample from './ComponentUsageExample';
import { isCallAgencyDeparture } from '../util/legUtils';
import { currentTime as exampleCurrentTime, departure as exampleDeparture, realtimeDeparture as exampleRealtimeDeparture } from './ExampleData';

function Departure(props) {
  var mode = props.departure.pattern.route.mode.toLowerCase();

  var platformNumber = false;
  if (props.isTerminal) {
    platformNumber = React.createElement(PlatformNumber, { number: props.departure.stop.platformCode });
  }

  return React.createElement(
    'p',
    { className: cx('departure', 'route-detail-text', props.className) },
    React.createElement(DepartureTime, {
      departureTime: props.departure.stoptime,
      realtime: props.departure.realtime,
      currentTime: props.currentTime,
      canceled: props.canceled,
      useUTC: props.useUTC
    }),
    React.createElement(RouteNumberContainer, {
      route: props.departure.pattern.route,
      isCallAgency: isCallAgencyDeparture(props.departure),
      fadeLong: true
    }),
    React.createElement(RouteDestination, {
      mode: mode,
      destination: props.departure.headsign || props.departure.pattern.headsign || props.departure.pattern.route.longName,
      isArrival: props.isArrival
    }),
    platformNumber
  );
}

Departure.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display a departure row using react components'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(Departure, {
        departure: exampleRealtimeDeparture,
        currentTime: exampleCurrentTime,
        useUTC: true
      })
    ),
    React.createElement(
      ComponentUsageExample,
      {
        description: 'adding padding classes'
      },
      React.createElement(Departure, {
        departure: exampleDeparture,
        currentTime: exampleCurrentTime,
        className: 'padding-normal padding-bottom',
        useUTC: true
      })
    ),
    React.createElement(
      ComponentUsageExample,
      {
        description: 'with platform number'
      },
      React.createElement(Departure, {
        departure: exampleDeparture,
        currentTime: exampleCurrentTime,
        className: 'padding-normal padding-bottom',
        isTerminal: true,
        useUTC: true
      })
    ),
    React.createElement(
      ComponentUsageExample,
      {
        description: 'isArrival true'
      },
      React.createElement(Departure, {
        departure: exampleDeparture,
        currentTime: exampleCurrentTime,
        className: 'padding-normal padding-bottom',
        useUTC: true,
        isArrival: true
      })
    )
  );
};

Departure.displayName = 'Departure';

Departure.propTypes = {
  canceled: PropTypes.bool,
  className: PropTypes.string,
  currentTime: PropTypes.number.isRequired,
  departure: PropTypes.object.isRequired,
  isArrival: PropTypes.bool,
  isTerminal: PropTypes.bool,
  useUTC: PropTypes.bool
};

export default Departure;