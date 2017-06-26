import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import PlaceAtDistanceListContainer from './PlaceAtDistanceListContainer';

var NearbyRouteList = function NearbyRouteList(props) {
  return React.createElement(PlaceAtDistanceListContainer, {
    currentTime: props.currentTime,
    timeRange: props.timeRange,
    places: props.nearest.places
  });
};

NearbyRouteList.propTypes = {
  nearest: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired,
  timeRange: PropTypes.number.isRequired
};

export default Relay.createContainer(NearbyRouteList, {
  fragments: {
    nearest: function nearest(variables) {
      return function (RQL_0) {
        return {
          children: [{
            alias: 'places',
            calls: [{
              kind: 'Call',
              metadata: {},
              name: 'lat',
              value: {
                kind: 'CallVariable',
                callVariableName: 'lat'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'lon',
              value: {
                kind: 'CallVariable',
                callVariableName: 'lon'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'maxDistance',
              value: {
                kind: 'CallVariable',
                callVariableName: 'maxDistance'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'maxResults',
              value: {
                kind: 'CallVariable',
                callVariableName: 'maxResults'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'first',
              value: {
                kind: 'CallVariable',
                callVariableName: 'maxResults'
              }
            }, {
              kind: 'Call',
              metadata: {
                type: '[Mode]'
              },
              name: 'filterByModes',
              value: {
                kind: 'CallVariable',
                callVariableName: 'modes'
              }
            }, {
              kind: 'Call',
              metadata: {
                type: '[FilterPlaceType]'
              },
              name: 'filterByPlaceTypes',
              value: {
                kind: 'CallVariable',
                callVariableName: 'placeTypes'
              }
            }],
            children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
            fieldName: 'nearest',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isConnection: true
            },
            type: 'placeAtDistanceConnection'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'NearbyRouteListContainer_NearestRelayQL',
          type: 'QueryType'
        };
      }(PlaceAtDistanceListContainer.getFragment('places', {
        currentTime: variables.currentTime,
        timeRange: variables.timeRange
      }));
    }
  },

  initialVariables: {
    lat: null,
    lon: null,
    maxDistance: 0,
    maxResults: 50,
    modes: [],
    placeTypes: [],
    currentTime: 0,
    timeRange: 0
  }
});