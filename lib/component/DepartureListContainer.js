import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Relay from 'react-relay';
import filter from 'lodash/filter';
import get from 'lodash/get';
import moment from 'moment';
import { Link } from 'react-router';
import cx from 'classnames';
import Departure from './Departure';
import { isBrowser } from '../util/browser';

var asDepartures = function asDepartures(stoptimes) {
  return !stoptimes ? [] : stoptimes.map(function (stoptime) {
    var isArrival = stoptime.pickupType === 'NONE';
    /* OTP returns either scheduled time or realtime prediction in
     * 'realtimeDeparture' and 'realtimeArrival' fields.
     * EXCEPT when state is CANCELLED, then it returns -1 for realtime  */
    var canceled = stoptime.realtimeState === 'CANCELED';
    var arrivalTime = stoptime.serviceDay + (!canceled ? stoptime.realtimeArrival : stoptime.scheduledArrival);
    var departureTime = stoptime.serviceDay + (!canceled ? stoptime.realtimeDeparture : stoptime.scheduledDeparture);
    var stoptimeTime = isArrival ? arrivalTime : departureTime;

    return {
      canceled: canceled,
      isArrival: isArrival,
      stoptime: stoptimeTime,
      stop: stoptime.stop,
      realtime: stoptime.realtime,
      pattern: stoptime.trip.pattern,
      headsign: stoptime.stopHeadsign,
      trip: stoptime.trip,
      pickupType: stoptime.pickupType
    };
  });
};

var DepartureListContainer = function (_Component) {
  _inherits(DepartureListContainer, _Component);

  function DepartureListContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, DepartureListContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onScroll = function () {
      if (_this.props.infiniteScroll && isBrowser) {
        return _this.scrollHandler;
      }
      return null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  DepartureListContainer.prototype.render = function render() {
    var _this2 = this;

    var departureObjs = [];
    var currentTime = this.props.currentTime;
    var currentDate = moment.unix(this.props.currentTime).startOf('day').unix();
    var tomorrow = moment.unix(this.props.currentTime).add(1, 'day').startOf('day').unix();

    var departures = asDepartures(this.props.stoptimes).filter(function (departure) {
      return !(_this2.props.isTerminal && departure.isArrival);
    }).filter(function (departure) {
      return currentTime < departure.stoptime;
    }).slice(0, this.props.limit);

    departures.forEach(function (departure) {
      if (departure.stoptime >= tomorrow) {
        departureObjs.push(React.createElement(
          'div',
          {
            key: moment.unix(departure.stoptime).format('DDMMYYYY'),
            className: 'date-row border-bottom'
          },
          moment.unix(departure.stoptime).format('dddd D.M.YYYY')
        ));

        currentDate = tomorrow;
        tomorrow = moment.unix(currentDate).add(1, 'day').startOf('day').unix();
      }

      var id = departure.pattern.code + ':' + departure.stoptime;

      var classes = {
        disruption: filter(departure.pattern.alerts, function (alert) {
          return alert.effectiveStartDate <= departure.stoptime && departure.stoptime <= alert.effectiveEndDate && (get(alert.trip.gtfsId) === null || get(alert.trip.gtfsId) === get(departure.trip.gtfsId));
        }).length > 0,
        canceled: departure.canceled
      };

      var departureObj = React.createElement(Departure, {
        key: id,
        departure: departure,
        showStop: _this2.props.showStops,
        currentTime: currentTime,
        className: cx(classes, _this2.props.rowClasses),
        canceled: departure.canceled,
        isArrival: departure.isArrival,
        isTerminal: _this2.props.isTerminal
      });

      if (_this2.props.routeLinks) {
        departureObjs.push(React.createElement(
          Link,
          {
            to: '/linjat/' + departure.pattern.route.gtfsId + '/pysakit/' + departure.pattern.code,
            key: id
          },
          departureObj
        ));
      } else {
        departureObjs.push(departureObj);
      }
    });

    return React.createElement(
      'div',
      {
        className: cx('departure-list', this.props.className),
        onScroll: this.onScroll()
      },
      departureObjs
    );
  };

  return DepartureListContainer;
}(Component);

DepartureListContainer.propTypes = {
  rowClasses: PropTypes.string.isRequired,
  stoptimes: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired,
  limit: PropTypes.number,
  infiniteScroll: PropTypes.bool,
  showStops: PropTypes.bool,
  routeLinks: PropTypes.bool,
  className: PropTypes.string,
  isTerminal: PropTypes.bool
};


export default Relay.createContainer(DepartureListContainer, {
  fragments: {
    stoptimes: function stoptimes() {
      return function () {
        return {
          children: [{
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
            fieldName: 'scheduledDeparture',
            kind: 'Field',
            metadata: {},
            type: 'Int'
          }, {
            fieldName: 'realtimeArrival',
            kind: 'Field',
            metadata: {},
            type: 'Int'
          }, {
            fieldName: 'scheduledArrival',
            kind: 'Field',
            metadata: {},
            type: 'Int'
          }, {
            fieldName: 'realtime',
            kind: 'Field',
            metadata: {},
            type: 'Boolean'
          }, {
            fieldName: 'serviceDay',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }, {
            fieldName: 'pickupType',
            kind: 'Field',
            metadata: {},
            type: 'PickupDropoffType'
          }, {
            fieldName: 'stopHeadsign',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            children: [{
              fieldName: 'code',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'platformCode',
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
            fieldName: 'stop',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Stop'
          }, {
            children: [{
              fieldName: 'gtfsId',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              children: [{
                children: [{
                  fieldName: 'effectiveStartDate',
                  kind: 'Field',
                  metadata: {},
                  type: 'Long'
                }, {
                  fieldName: 'effectiveEndDate',
                  kind: 'Field',
                  metadata: {},
                  type: 'Long'
                }, {
                  children: [{
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
                  fieldName: 'trip',
                  kind: 'Field',
                  metadata: {
                    canHaveSubselections: true,
                    inferredRootCallName: 'node',
                    inferredPrimaryKey: 'id'
                  },
                  type: 'Trip'
                }, {
                  fieldName: 'id',
                  kind: 'Field',
                  metadata: {
                    isGenerated: true,
                    isRequisite: true
                  },
                  type: 'ID'
                }],
                fieldName: 'alerts',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  inferredRootCallName: 'node',
                  inferredPrimaryKey: 'id',
                  isPlural: true
                },
                type: 'Alert'
              }, {
                children: [{
                  fieldName: 'gtfsId',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'shortName',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'longName',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'mode',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'color',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  children: [{
                    fieldName: 'name',
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
                  fieldName: 'agency',
                  kind: 'Field',
                  metadata: {
                    canHaveSubselections: true,
                    inferredRootCallName: 'node',
                    inferredPrimaryKey: 'id'
                  },
                  type: 'Agency'
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
              fieldName: 'pattern',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id'
              },
              type: 'Pattern'
            }, {
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'trip',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Trip'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {
            plural: true
          },
          name: 'DepartureListContainer_StoptimesRelayQL',
          type: 'Stoptime'
        };
      }();
    }
  }
});