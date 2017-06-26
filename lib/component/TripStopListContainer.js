import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import connectToStores from 'fluxible-addons-react/connectToStores';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';

import TripRouteStop from './TripRouteStop';
import { getDistanceToNearestStop } from '../util/geo-utils';

var TripStopListContainer = function (_React$Component) {
  _inherits(TripStopListContainer, _React$Component);

  function TripStopListContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, TripStopListContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.getNearestStopDistance = function (stops) {
      return _this.props.locationState.hasLocation === true ? getDistanceToNearestStop(_this.props.locationState.lat, _this.props.locationState.lon, stops) : null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TripStopListContainer.prototype.componentDidMount = function componentDidMount() {
    var el = document.getElementsByClassName('selected-tail-icon')[0];
    if (el) {
      el.scrollIntoView();
    }
  };

  TripStopListContainer.prototype.getStops = function getStops() {
    var _this2 = this;

    var stops = this.props.trip.stoptimesForDate.map(function (stoptime) {
      return stoptime.stop;
    });

    var nearest = this.getNearestStopDistance(stops);

    var mode = this.props.trip.route.mode.toLowerCase();

    var vehicles = groupBy(values(this.props.vehicles).filter(function (vehicle) {
      return _this2.props.currentTime - vehicle.timestamp * 1000 < 5 * 60 * 1000;
    }).filter(function (vehicle) {
      return vehicle.tripStartTime && vehicle.tripStartTime !== 'undefined';
    }), function (vehicle) {
      return vehicle.direction;
    });

    var vehicleStops = groupBy(vehicles[this.props.trip.pattern.directionId], function (vehicle) {
      return 'HSL:' + vehicle.next_stop;
    });

    var vehiclesWithCorrectStartTime = Object.keys(this.props.vehicles).map(function (key) {
      return _this2.props.vehicles[key];
    }).filter(function (vehicle) {
      return vehicle.direction === _this2.props.trip.pattern.directionId;
    }).filter(function (vehicle) {
      return vehicle.tripStartTime === _this2.props.tripStart;
    });

    // selected vehicle
    var vehicle = vehiclesWithCorrectStartTime.length > 0 && vehiclesWithCorrectStartTime[0];
    var nextStop = vehicle && 'HSL:' + vehicle.next_stop;

    var stopPassed = true;

    return this.props.trip.stoptimesForDate.map(function (stoptime, index) {
      if (nextStop === stoptime.stop.gtfsId) {
        stopPassed = false;
      } else if (vehicle.stop_index === index) {
        stopPassed = false;
      } else if (stoptime.realtimeDeparture + stoptime.serviceDay > _this2.props.currentTime && isEmpty(vehicle)) {
        stopPassed = false;
      }

      return React.createElement(TripRouteStop, {
        key: stoptime.stop.gtfsId,
        stoptime: stoptime,
        stop: stoptime.stop,
        mode: mode,
        vehicles: vehicleStops[stoptime.stop.gtfsId],
        selectedVehicle: vehicle,
        stopPassed: stopPassed,
        realtime: stoptime.realtime,
        distance: nearest != null && nearest.stop != null && nearest.stop.gtfsId === stoptime.stop.gtfsId && nearest.distance < _this2.context.config.nearestStopDistance.maxShownDistance && nearest.distance,
        currentTime: _this2.props.currentTime.unix(),
        realtimeDeparture: stoptime.realtimeDeparture,
        pattern: _this2.props.trip.pattern.code,
        route: _this2.props.trip.route.gtfsId,
        last: index === _this2.props.trip.stoptimesForDate.length - 1,
        first: index === 0,
        fullscreenMap: _this2.props.fullscreenMap,
        className: _this2.context.breakpoint === 'large' && 'bp-large'
      });
    });
  };

  TripStopListContainer.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: cx('route-stop-list momentum-scroll', this.props.className) },
      this.getStops()
    );
  };

  return TripStopListContainer;
}(React.Component);

TripStopListContainer.propTypes = {
  trip: PropTypes.object.isRequired,
  className: PropTypes.string,
  vehicles: PropTypes.object,
  locationState: PropTypes.object.isRequired,
  currentTime: PropTypes.object.isRequired,
  tripStart: PropTypes.string.isRequired,
  fullscreenMap: PropTypes.bool
};
TripStopListContainer.contextTypes = {
  breakpoint: PropTypes.string,
  config: PropTypes.object.isRequired
};


export default Relay.createContainer(connectToStores(TripStopListContainer, ['RealTimeInformationStore', 'PositionStore', 'TimeStore'], function (_ref) {
  var getStore = _ref.getStore;
  return {
    vehicles: getStore('RealTimeInformationStore').vehicles,
    locationState: getStore('PositionStore').getLocationState(),
    currentTime: getStore('TimeStore').getCurrentTime()
  };
}), {
  fragments: {
    trip: function trip() {
      return function () {
        return {
          children: [{
            children: [{
              fieldName: 'mode',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'gtfsId',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'route',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Route'
          }, {
            children: [{
              fieldName: 'code',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'directionId',
              kind: 'Field',
              metadata: {},
              type: 'Int'
            }, {
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'pattern',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Pattern'
          }, {
            children: [{
              children: [{
                fieldName: 'gtfsId',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'name',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'desc',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'code',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'lat',
                kind: 'Field',
                metadata: {},
                type: 'Float'
              }, {
                fieldName: 'lon',
                kind: 'Field',
                metadata: {},
                type: 'Float'
              }, {
                fieldName: 'id',
                kind: 'Field',
                metadata: {
                  isGenerated: true,
                  isRequisite: true
                },
                type: 'ID'
              }],
              fieldName: 'stop',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id'
              },
              type: 'Stop'
            }, {
              fieldName: 'realtimeDeparture',
              kind: 'Field',
              metadata: {},
              type: 'Int'
            }, {
              fieldName: 'realtime',
              kind: 'Field',
              metadata: {},
              type: 'Boolean'
            }, {
              fieldName: 'scheduledDeparture',
              kind: 'Field',
              metadata: {},
              type: 'Int'
            }, {
              fieldName: 'serviceDay',
              kind: 'Field',
              metadata: {},
              type: 'Long'
            }, {
              fieldName: 'realtimeState',
              kind: 'Field',
              metadata: {},
              type: 'RealtimeState'
            }],
            fieldName: 'stoptimesForDate',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isPlural: true
            },
            type: 'Stoptime'
          }, {
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'TripStopListContainer_TripRelayQL',
          type: 'Trip'
        };
      }();
    }
  }
});