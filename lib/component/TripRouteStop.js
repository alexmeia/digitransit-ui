import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import ComponentUsageExample from './ComponentUsageExample';
import WalkDistance from './WalkDistance';
import StopCode from './StopCode';
import PatternLink from './PatternLink';
import { fromStopTime } from './DepartureTime';
import { currentTime as exampleCurrentTime, departure as exampleDeparture, realtimeDeparture as exampleRealtimeDeparture, vehicle as exampleVehicle } from './ExampleData';

var getRouteStopSvg = function getRouteStopSvg(first, last) {
  return React.createElement(
    'svg',
    { className: 'route-stop-schematized' },
    React.createElement('line', {
      x1: '6',
      x2: '6',
      y1: first ? 13 : 0,
      y2: last ? 13 : 67,
      strokeWidth: '5',
      stroke: 'currentColor'
    }),
    React.createElement('line', {
      x1: '6',
      x2: '6',
      y1: first ? 13 : 0,
      y2: last ? 13 : 67,
      strokeWidth: '2',
      stroke: 'white',
      opacity: '0.2'
    }),
    React.createElement('circle', { strokeWidth: '2', stroke: 'currentColor', fill: 'white', cx: '6', cy: '13', r: '5' })
  );
};

var TripRouteStop = function TripRouteStop(props) {
  var vehicles = props.vehicles && props.vehicles.map(function (vehicle) {
    return React.createElement(PatternLink, {
      key: vehicle.id,
      mode: vehicle.mode,
      pattern: props.pattern,
      route: props.route,
      selected: props.selectedVehicle && props.selectedVehicle.id === vehicle.id,
      fullscreenMap: props.fullscreenMap
    });
  });

  return React.createElement(
    'div',
    { className: cx('route-stop row', { passed: props.stopPassed }, props.className) },
    React.createElement(
      'div',
      { className: 'columns route-stop-now' },
      vehicles
    ),
    React.createElement(
      Link,
      { to: '/pysakit/' + props.stop.gtfsId },
      React.createElement(
        'div',
        { className: 'columns route-stop-name ' + props.mode },
        getRouteStopSvg(props.first, props.last),
        props.stop.name,
        React.createElement('br', null),
        React.createElement(
          'div',
          { style: { whiteSpace: 'nowrap' } },
          props.stop.code && React.createElement(StopCode, { code: props.stop.code }),
          React.createElement(
            'span',
            { className: 'route-stop-address' },
            props.stop.desc
          ),
          '\u2002',
          props.distance && React.createElement(WalkDistance, {
            className: 'nearest-route-stop',
            icon: 'icon_location-with-user',
            walkDistance: props.distance
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'columns route-stop-time' },
        props.stoptime && fromStopTime(props.stoptime, props.currentTime)
      )
    ),
    React.createElement('div', { className: 'route-stop-row-divider' })
  );
};

TripRouteStop.propTypes = {
  vehicles: PropTypes.array,
  mode: PropTypes.string.isRequired,
  stopPassed: PropTypes.bool,
  realtimeDeparture: PropTypes.number,
  stop: PropTypes.object.isRequired,
  distance: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([false])]).isRequired,
  stoptime: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired,
  pattern: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  className: PropTypes.string,
  selectedVehicle: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([false])]).isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool,
  fullscreenMap: PropTypes.bool
};

TripRouteStop.displayName = 'TripRouteStop';

TripRouteStop.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders a row intended to for use in a trip route stop list. The row contains the information of a single stop along a certain route.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Not realtime, no vehicle info:' },
      React.createElement(TripRouteStop, {
        key: exampleDeparture.stop.gtfsId,
        stop: exampleDeparture.stop,
        mode: exampleDeparture.pattern.route.mode,
        route: exampleDeparture.pattern.route.gtfsId,
        pattern: exampleDeparture.pattern.code,
        vehicles: null,
        stopPassed: true,
        realtime: exampleDeparture.realtime,
        distance: 321,
        realtimeDeparture: null,
        stoptime: exampleDeparture,
        currentTime: exampleCurrentTime,
        selectedVehicle: false
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Realtime with vehicle info:' },
      React.createElement(TripRouteStop, {
        key: exampleRealtimeDeparture.stop.gtfsId,
        stop: exampleRealtimeDeparture.stop,
        mode: exampleRealtimeDeparture.pattern.route.mode,
        pattern: exampleDeparture.pattern.code,
        route: exampleDeparture.pattern.route.gtfsId,
        vehicles: [exampleVehicle],
        stopPassed: false,
        realtime: exampleRealtimeDeparture.realtime,
        distance: 231,
        realtimeDeparture: exampleRealtimeDeparture.realtimeDeparture,
        stoptime: exampleRealtimeDeparture,
        currentTime: exampleCurrentTime,
        selectedVehicle: exampleVehicle
      })
    )
  );
};

export default TripRouteStop;