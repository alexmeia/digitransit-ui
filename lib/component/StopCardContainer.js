import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';

import StopCardHeaderContainer from './StopCardHeaderContainer';
import DepartureListContainer from './DepartureListContainer';
import StopCard from './StopCard';

var StopCardContainer = connectToStores(StopCard, ['FavouriteStopsStore'], function (context, props) {
  return {
    isTerminal: props.isTerminal,
    children: React.createElement(DepartureListContainer, {
      rowClasses: 'no-padding no-margin',
      stoptimes: props.stop.stoptimes,
      limit: props.limit,
      isTerminal: props.isTerminal,
      currentTime: props.relay.variables.startTime
    })
  };
});

StopCardContainer.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  getStore: PropTypes.func.isRequired
};

export default Relay.createContainer(StopCardContainer, {
  fragments: {
    stop: function stop() {
      return function (RQL_0, RQL_1) {
        return {
          children: [].concat.apply([], [{
            fieldName: 'gtfsId',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            alias: 'stoptimes',
            calls: [{
              kind: 'Call',
              metadata: {
                type: 'Long'
              },
              name: 'startTime',
              value: {
                kind: 'CallVariable',
                callVariableName: 'startTime'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'timeRange',
              value: {
                kind: 'CallVariable',
                callVariableName: 'timeRange'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'numberOfDepartures',
              value: {
                kind: 'CallVariable',
                callVariableName: 'numberOfDepartures'
              }
            }],
            children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
            fieldName: 'stoptimesWithoutPatterns',
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
          }, Relay.QL.__frag(RQL_1)]),
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'StopCardContainer_StopRelayQL',
          type: 'Stop'
        };
      }(DepartureListContainer.getFragment('stoptimes'), StopCardHeaderContainer.getFragment('stop'));
    }
  },
  initialVariables: {
    startTime: 0,
    timeRange: 12 * 60 * 60,
    numberOfDepartures: 5
  }
});