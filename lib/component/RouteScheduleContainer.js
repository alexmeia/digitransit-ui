import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Relay from 'react-relay';
import moment from 'moment';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { intlShape } from 'react-intl';
import keyBy from 'lodash/keyBy';
import sortBy from 'lodash/sortBy';
import RouteScheduleHeader from './RouteScheduleHeader';
import RouteScheduleTripRow from './RouteScheduleTripRow';
import DateSelect from './DateSelect';
import PrintLink from './PrintLink';
import Loading from './Loading';

var DATE_FORMAT = 'YYYYMMDD';

var RouteScheduleContainer = function (_Component) {
  _inherits(RouteScheduleContainer, _Component);

  RouteScheduleContainer.transformTrips = function transformTrips(trips, stops) {
    if (trips == null) {
      return null;
    }
    var transformedTrips = trips.map(function (trip) {
      var newTrip = _extends({}, trip);
      newTrip.stoptimes = keyBy(trip.stoptimes, 'stop.id');
      return newTrip;
    });
    transformedTrips = sortBy(transformedTrips, function (trip) {
      return trip.stoptimes[stops[0].id].scheduledDeparture;
    });
    return transformedTrips;
  };

  function RouteScheduleContainer(props) {
    _classCallCheck(this, RouteScheduleContainer);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onFromSelectChange = function (event) {
      var from = Number(event.target.value);
      var to = _this.state.to > from ? _this.state.to : from + 1;
      _this.setState(_extends({}, _this.state, { from: from, to: to }));
    };

    _this.onToSelectChange = function (event) {
      var to = Number(event.target.value);
      _this.setState(_extends({}, _this.state, { to: to }));
    };

    _this.getTrips = function (from, to) {
      var stops = _this.props.pattern.stops;

      var trips = RouteScheduleContainer.transformTrips(_this.props.pattern.tripsForDate, stops);
      if (trips == null) {
        return React.createElement(Loading, null);
      } else if (trips.length === 0) {
        return React.createElement(
          'div',
          { className: 'text-center' },
          _this.context.intl.formatMessage({ id: 'no-trips-found', defaultMessage: 'No journeys found for the selected date.' })
        );
      }
      return trips.map(function (trip) {
        var fromSt = trip.stoptimes[stops[from].id];
        var toSt = trip.stoptimes[stops[to].id];
        var departureTime = _this.formatTime(fromSt.serviceDay + fromSt.scheduledDeparture);
        var arrivalTime = _this.formatTime(toSt.serviceDay + toSt.scheduledArrival);

        return React.createElement(RouteScheduleTripRow, {
          key: trip.id,
          departureTime: departureTime,
          arrivalTime: arrivalTime
        });
      });
    };

    _this.formatTime = function (timestamp) {
      return moment(timestamp * 1000).format('HH:mm');
    };

    _this.changeDate = function (_ref) {
      var target = _ref.target;

      // TODO: add setState and a callback that resets the laoding state in oreder to get a spinner.
      _this.props.relay.setVariables({
        serviceDay: target.value
      });
    };

    _this.initState(props, true);
    props.relay.setVariables({ serviceDay: props.serviceDay });
    return _this;
  }

  RouteScheduleContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    // If route has changed, reset state.
    if (nextProps.relay.route.params.patternId !== this.props.relay.route.params.patternId) {
      this.initState(nextProps, false);
      nextProps.relay.setVariables({ serviceDay: nextProps.serviceDay });
    }
  };

  RouteScheduleContainer.prototype.initState = function initState(props, isInitialState) {
    var state = {
      from: 0,
      to: props.pattern.stops.length - 1
    };

    if (isInitialState) {
      this.state = state;
    } else {
      this.setState(state);
    }
  };

  RouteScheduleContainer.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'route-schedule-content-wrapper' },
      React.createElement(
        'div',
        { className: 'route-page-action-bar' },
        React.createElement(DateSelect, {
          startDate: this.props.serviceDay,
          selectedDate: this.props.relay.variables.serviceDay,
          dateFormat: DATE_FORMAT,
          onDateChange: this.changeDate
        }),
        React.createElement(PrintLink, { className: 'action-bar', href: this.props.pattern.route.url })
      ),
      React.createElement(
        'div',
        { className: 'route-schedule-list-wrapper' },
        React.createElement(RouteScheduleHeader, {
          stops: this.props.pattern.stops,
          from: this.state.from,
          to: this.state.to,
          onFromSelectChange: this.onFromSelectChange,
          onToSelectChange: this.onToSelectChange
        }),
        React.createElement(
          'div',
          { className: 'route-schedule-list momentum-scroll' },
          this.getTrips(this.state.from, this.state.to)
        )
      )
    );
  };

  return RouteScheduleContainer;
}(Component);

RouteScheduleContainer.propTypes = {
  pattern: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
  serviceDay: PropTypes.string.isRequired
};
RouteScheduleContainer.contextTypes = {
  intl: intlShape.isRequired
};


var relayInitialVariables = {
  serviceDay: '19700101'
};

export var relayFragment = {
  pattern: function pattern() {
    return function () {
      return {
        children: [{
          children: [{
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isRequisite: true
            },
            type: 'ID'
          }, {
            fieldName: 'name',
            kind: 'Field',
            metadata: {},
            type: 'String'
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
          children: [{
            fieldName: 'url',
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
          calls: [{
            kind: 'Call',
            metadata: {},
            name: 'serviceDay',
            value: {
              kind: 'CallVariable',
              callVariableName: 'serviceDay'
            }
          }],
          children: [{
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isRequisite: true
            },
            type: 'ID'
          }, {
            alias: 'stoptimes',
            calls: [{
              kind: 'Call',
              metadata: {},
              name: 'serviceDay',
              value: {
                kind: 'CallVariable',
                callVariableName: 'serviceDay'
              }
            }],
            children: [{
              fieldName: 'scheduledArrival',
              kind: 'Field',
              metadata: {},
              type: 'Int'
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
              children: [{
                fieldName: 'id',
                kind: 'Field',
                metadata: {
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
            }],
            fieldName: 'stoptimesForDate',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isPlural: true
            },
            type: 'Stoptime'
          }],
          fieldName: 'tripsForDate',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            inferredRootCallName: 'node',
            inferredPrimaryKey: 'id',
            isPlural: true
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
        id: Relay.QL.__id(),
        kind: 'Fragment',
        metadata: {},
        name: 'RouteScheduleContainer_PatternRelayQL',
        type: 'Pattern'
      };
    }();
  }
};

export default connectToStores(Relay.createContainer(RouteScheduleContainer, {
  initialVariables: relayInitialVariables,
  fragments: relayFragment
}), [], function (context) {
  return {
    serviceDay: context.getStore('TimeStore').getCurrentTime().format(DATE_FORMAT)
  };
});