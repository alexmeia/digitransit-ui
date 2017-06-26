import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';

import DepartureRowContainer from './DepartureRowContainer';
import BicycleRentalStationRowContainer from './BicycleRentalStationRowContainer';

var placeAtDistanceFragment = function placeAtDistanceFragment(variables) {
  return function (RQL_0, RQL_1) {
    return {
      children: [{
        fieldName: 'distance',
        kind: 'Field',
        metadata: {},
        type: 'Int'
      }, {
        children: [].concat.apply([], [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isRequisite: true
          },
          type: 'ID'
        }, {
          fieldName: '__typename',
          kind: 'Field',
          metadata: {
            isRequisite: true
          },
          type: 'String'
        }, Relay.QL.__frag(RQL_0), Relay.QL.__frag(RQL_1)]),
        fieldName: 'place',
        kind: 'Field',
        metadata: {
          canHaveSubselections: true,
          inferredRootCallName: 'node',
          inferredPrimaryKey: 'id',
          isAbstract: true
        },
        type: 'PlaceInterface'
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
      name: 'PlaceAtDistanceContainerRelayQL',
      type: 'placeAtDistance'
    };
  }(DepartureRowContainer.getFragment('departure', {
    currentTime: variables.currentTime,
    timeRange: variables.timeRange
  }), BicycleRentalStationRowContainer.getFragment('station', {
    currentTime: variables.currentTime
  }));
};

/* eslint-disable no-underscore-dangle */
var PlaceAtDistance = function PlaceAtDistance(props) {
  var place = void 0;
  if (props.placeAtDistance.place.__typename === 'DepartureRow') {
    place = React.createElement(DepartureRowContainer, {
      distance: props.placeAtDistance.distance,
      departure: props.placeAtDistance.place,
      currentTime: props.currentTime,
      timeRange: props.timeRange
    });
  } else if (props.placeAtDistance.place.__typename === 'BikeRentalStation') {
    place = React.createElement(BicycleRentalStationRowContainer, {
      distance: props.placeAtDistance.distance,
      station: props.placeAtDistance.place,
      currentTime: props.currentTime
    });
  }
  return place;
};
/* eslint-enable no-underscore-dangle */

PlaceAtDistance.propTypes = {
  placeAtDistance: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired,
  timeRange: PropTypes.number.isRequired
};

export default Relay.createContainer(PlaceAtDistance, {
  fragments: {
    placeAtDistance: placeAtDistanceFragment
  },

  initialVariables: {
    currentTime: 0,
    timeRange: 0
  }
});