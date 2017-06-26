import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import StopCardContainer from '../../StopCardContainer';
import MarkerPopupBottom from '../MarkerPopupBottom';

var NUMBER_OF_DEPARTURES = 5;
var STOP_TIME_RANGE = 12 * 60 * 60;
var TERMINAL_TIME_RANGE = 60 * 60;

function StopMarkerPopup(props) {
  var stop = props.stop || props.terminal;
  var terminal = props.terminal !== null;

  return React.createElement(
    'div',
    { className: 'card' },
    React.createElement(StopCardContainer, {
      stop: stop,
      numberOfDepartures: (terminal ? 3 : 1) * NUMBER_OF_DEPARTURES,
      startTime: props.relay.variables.currentTime,
      isTerminal: terminal,
      timeRange: terminal ? TERMINAL_TIME_RANGE : STOP_TIME_RANGE,
      limit: NUMBER_OF_DEPARTURES,
      className: 'padding-small cursor-pointer'
    }),
    React.createElement(MarkerPopupBottom, {
      location: {
        address: stop.name,
        lat: stop.lat,
        lon: stop.lon
      }
    })
  );
}

StopMarkerPopup.propTypes = {
  stop: PropTypes.object,
  terminal: PropTypes.object,
  relay: PropTypes.shape({
    variables: PropTypes.shape({
      currentTime: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default Relay.createContainer(StopMarkerPopup, {
  fragments: {
    stop: function stop(_ref) {
      var currentTime = _ref.currentTime;
      return function (RQL_0) {
        return {
          children: [].concat.apply([], [{
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
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }, Relay.QL.__frag(RQL_0)]),
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'StopMarkerPopup_StopRelayQL',
          type: 'Stop'
        };
      }(StopCardContainer.getFragment('stop', {
        startTime: currentTime,
        timeRange: STOP_TIME_RANGE,
        numberOfDepartures: NUMBER_OF_DEPARTURES
      }));
    },
    terminal: function terminal(_ref2) {
      var currentTime = _ref2.currentTime;
      return function (RQL_0) {
        return {
          children: [].concat.apply([], [{
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
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }, Relay.QL.__frag(RQL_0)]),
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'StopMarkerPopup_TerminalRelayQL',
          type: 'Stop'
        };
      }(StopCardContainer.getFragment('stop', {
        startTime: currentTime,
        timeRange: TERMINAL_TIME_RANGE,
        // Terminals do not show arrivals, so we need some slack
        numberOfDepartures: NUMBER_OF_DEPARTURES * 3
      }));
    }
  },
  initialVariables: {
    currentTime: 0
  }
});