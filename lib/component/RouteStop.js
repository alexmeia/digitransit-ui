import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import cx from 'classnames';

import FuzzyTripRoute from './FuzzyTripRoute';
import TripLink from './TripLink';
import WalkDistance from './WalkDistance';
import StopCode from './StopCode';
import { fromStopTime } from './DepartureTime';
import ComponentUsageExample from './ComponentUsageExample';

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

var RouteStop = function (_React$Component) {
  _inherits(RouteStop, _React$Component);

  function RouteStop() {
    _classCallCheck(this, RouteStop);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  RouteStop.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        vehicles = _props.vehicles,
        stop = _props.stop,
        mode = _props.mode,
        distance = _props.distance,
        last = _props.last,
        first = _props.first,
        currentTime = _props.currentTime,
        className = _props.className;


    var vehicleTripLinks = vehicles && vehicles.map(function (vehicle) {
      return React.createElement(Relay.RootContainer, {
        key: vehicle.id,
        Component: TripLink,
        route: new FuzzyTripRoute({
          route: vehicle.route,
          direction: vehicle.direction,
          date: vehicle.operatingDay,
          time: vehicle.tripStartTime.substring(0, 2) * 60 * 60 + vehicle.tripStartTime.substring(2, 4) * 60
        }),
        renderFetched: function renderFetched(data) {
          return React.createElement(TripLink, _extends({
            mode: vehicle.mode
          }, data));
        }
      });
    });

    return React.createElement(
      'div',
      { className: cx('route-stop row', className), ref: function ref(el) {
          return _this2.element = el;
        } },
      React.createElement(
        'div',
        { className: 'columns route-stop-now' },
        vehicleTripLinks
      ),
      React.createElement(
        Link,
        { to: '/pysakit/' + stop.gtfsId },
        React.createElement(
          'div',
          { className: 'columns route-stop-name ' + mode },
          getRouteStopSvg(first, last),
          stop.name,
          React.createElement('br', null),
          React.createElement(
            'div',
            { style: { whiteSpace: 'nowrap' } },
            stop.code && React.createElement(StopCode, { code: stop.code }),
            React.createElement(
              'span',
              { className: 'route-stop-address' },
              stop.desc
            ),
            '\u2002',
            distance && React.createElement(WalkDistance, {
              className: 'nearest-route-stop',
              icon: 'icon_location-with-user',
              walkDistance: distance
            })
          )
        ),
        stop.stopTimesForPattern && stop.stopTimesForPattern.length > 0 && stop.stopTimesForPattern.map(function (stopTime) {
          return React.createElement(
            'div',
            { key: stopTime.scheduledDeparture, className: 'columns route-stop-time' },
            fromStopTime(stopTime, currentTime)
          );
        })
      ),
      React.createElement('div', { className: 'route-stop-row-divider' })
    );
  };

  return RouteStop;
}(React.Component);

RouteStop.propTypes = {
  vehicles: PropTypes.array,
  stop: PropTypes.object,
  mode: PropTypes.string,
  className: PropTypes.string,
  distance: PropTypes.number,
  currentTime: PropTypes.number.isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool
};

RouteStop.description = function () {
  return React.createElement(
    ComponentUsageExample,
    { description: 'basic' },
    React.createElement(RouteStop, {
      stop: {
        stopTimesForPattern: [{
          realtime: true,
          realtimeState: 'UPDATED',
          realtimeDeparture: 48796,
          serviceDay: 1471467600,
          scheduledDeparture: 48780
        }, {
          realtime: false,
          realtimeState: 'SCHEDULED',
          realtimeDeparture: 49980,
          serviceDay: 1471467600,
          scheduledDeparture: 49980
        }],
        gtfsId: 'HSL:1173101',
        lat: 60.198185699999726,
        lon: 24.940634400000118,
        name: 'Asemapäällikönkatu',
        desc: 'Ratamestarinkatu',
        code: '0663'
      },
      mode: 'bus',
      distance: 200,
      last: false,
      currentTime: 1471515614
    })
  );
};

export default RouteStop;