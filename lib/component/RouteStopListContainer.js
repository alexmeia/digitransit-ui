import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import cx from 'classnames';

import { getDistanceToNearestStop } from '../util/geo-utils';
import RouteStop from './RouteStop';

var RouteStopListContainer = function (_React$Component) {
  _inherits(RouteStopListContainer, _React$Component);

  function RouteStopListContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, RouteStopListContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.setNearestStop = function (element) {
      _this.nearestStop = element;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  RouteStopListContainer.prototype.componentDidMount = function componentDidMount() {
    if (this.nearestStop) {
      this.nearestStop.element.scrollIntoView(false);
    }
  };

  RouteStopListContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var relay = _ref.relay,
        currentTime = _ref.currentTime;

    relay.setVariables({ currentTime: currentTime.unix() });
  };

  RouteStopListContainer.prototype.getStops = function getStops() {
    var _this2 = this;

    var position = this.props.position;
    var stops = this.props.pattern.stops;
    var nearest = position.hasLocation === true ? getDistanceToNearestStop(position.lat, position.lon, stops) : null;
    var mode = this.props.pattern.route.mode.toLowerCase();

    var vehicles = groupBy(values(this.props.vehicles).filter(function (vehicle) {
      return _this2.props.currentTime - vehicle.timestamp * 1000 < 5 * 60 * 1000;
    }).filter(function (vehicle) {
      return vehicle.tripStartTime && vehicle.tripStartTime !== 'undefined';
    }), function (vehicle) {
      return vehicle.direction;
    });

    var vehicleStops = groupBy(vehicles[this.props.pattern.directionId], function (vehicle) {
      return 'HSL:' + vehicle.next_stop;
    });

    var rowClassName = this.context.breakpoint === 'large' && 'bp-large';

    return stops.map(function (stop, i) {
      var isNearest = (nearest && nearest.distance < _this2.context.config.nearestStopDistance.maxShownDistance && nearest.stop.gtfsId) === stop.gtfsId;

      return React.createElement(RouteStop, {
        key: stop.gtfsId,
        stop: stop,
        mode: mode,
        vehicles: vehicleStops[stop.gtfsId],
        distance: isNearest ? nearest.distance : null,
        ref: isNearest ? _this2.setNearestStop : null,
        currentTime: _this2.props.currentTime.unix(),
        last: i === stops.length - 1,
        first: i === 0,
        className: rowClassName
      });
    });
  };

  RouteStopListContainer.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: cx('route-stop-list momentum-scroll', this.props.className) },
      this.getStops()
    );
  };

  return RouteStopListContainer;
}(React.Component);

RouteStopListContainer.propTypes = {
  pattern: PropTypes.object.isRequired,
  className: PropTypes.string,
  vehicles: PropTypes.object,
  position: PropTypes.object.isRequired,
  currentTime: PropTypes.object.isRequired
};
RouteStopListContainer.contextTypes = {
  breakpoint: PropTypes.string,
  config: PropTypes.object.isRequired
};


export default Relay.createContainer(connectToStores(RouteStopListContainer, ['RealTimeInformationStore', 'PositionStore', 'TimeStore'], function (_ref2) {
  var getStore = _ref2.getStore;
  return {
    vehicles: getStore('RealTimeInformationStore').vehicles,
    position: getStore('PositionStore').getLocationState(),
    currentTime: getStore('TimeStore').getCurrentTime()
  };
}), {
  initialVariables: {
    patternId: null,
    currentTime: 0
  },
  fragments: {
    pattern: function pattern() {
      return function () {
        return {
          children: [{
            fieldName: 'directionId',
            kind: 'Field',
            metadata: {},
            type: 'Int'
          }, {
            children: [{
              fieldName: 'mode',
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
              calls: [{
                kind: 'Call',
                metadata: {},
                name: 'id',
                value: {
                  kind: 'CallVariable',
                  callVariableName: 'patternId'
                }
              }, {
                kind: 'Call',
                metadata: {
                  type: 'Long'
                },
                name: 'startTime',
                value: {
                  kind: 'CallVariable',
                  callVariableName: 'currentTime'
                }
              }],
              children: [{
                fieldName: 'realtime',
                kind: 'Field',
                metadata: {},
                type: 'Boolean'
              }, {
                fieldName: 'realtimeState',
                kind: 'Field',
                metadata: {},
                type: 'RealtimeState'
              }, {
                fieldName: 'realtimeDeparture',
                kind: 'Field',
                metadata: {},
                type: 'Int'
              }, {
                fieldName: 'serviceDay',
                kind: 'Field',
                metadata: {},
                type: 'Long'
              }, {
                fieldName: 'scheduledDeparture',
                kind: 'Field',
                metadata: {},
                type: 'Int'
              }],
              fieldName: 'stopTimesForPattern',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                isPlural: true
              },
              type: 'Stoptime'
            }, {
              fieldName: 'gtfsId',
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
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'stops',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id',
              isPlural: true
            },
            type: 'Stop'
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
          name: 'RouteStopListContainer_PatternRelayQL',
          type: 'Pattern'
        };
      }();
    }
  }
});