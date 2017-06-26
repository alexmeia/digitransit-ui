import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import find from 'lodash/find';
import FavouriteLocation from './FavouriteLocation';

var FavouriteLocationContainer = function FavouriteLocationContainer(_ref) {
  var currentTime = _ref.currentTime,
      onClickFavourite = _ref.onClickFavourite,
      plan = _ref.plan,
      favourite = _ref.favourite;

  var itinerary = plan && plan.plan.itineraries[0] || {};
  var firstTransitLeg = find(itinerary.legs, function (leg) {
    return leg.transitLeg;
  });

  var departureTime = void 0;
  // We might not have any transit legs, just walking
  if (firstTransitLeg) {
    departureTime = firstTransitLeg.startTime / 1000;
  }

  return React.createElement(FavouriteLocation, _extends({
    favourite: favourite,
    clickFavourite: onClickFavourite
  }, {
    departureTime: departureTime,
    currentTime: currentTime,
    firstTransitLeg: firstTransitLeg
  }));
};

FavouriteLocationContainer.propTypes = {
  plan: PropTypes.object.isRequired,
  favourite: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired,
  onClickFavourite: PropTypes.func.isRequired
};

export default Relay.createContainer(FavouriteLocationContainer, {
  fragments: {
    plan: function plan() {
      return function () {
        return {
          children: [{
            calls: [{
              kind: 'Call',
              metadata: {
                type: 'InputCoordinates'
              },
              name: 'from',
              value: {
                kind: 'CallVariable',
                callVariableName: 'from'
              }
            }, {
              kind: 'Call',
              metadata: {
                type: 'InputCoordinates'
              },
              name: 'to',
              value: {
                kind: 'CallVariable',
                callVariableName: 'to'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'numItineraries',
              value: {
                kind: 'CallVariable',
                callVariableName: 'numItineraries'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'walkReluctance',
              value: {
                kind: 'CallVariable',
                callVariableName: 'walkReluctance'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'walkBoardCost',
              value: {
                kind: 'CallVariable',
                callVariableName: 'walkBoardCost'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'minTransferTime',
              value: {
                kind: 'CallVariable',
                callVariableName: 'minTransferTime'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'walkSpeed',
              value: {
                kind: 'CallVariable',
                callVariableName: 'walkSpeed'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'maxWalkDistance',
              value: {
                kind: 'CallVariable',
                callVariableName: 'maxWalkDistance'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'wheelchair',
              value: {
                kind: 'CallVariable',
                callVariableName: 'wheelchair'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'disableRemainingWeightHeuristic',
              value: {
                kind: 'CallVariable',
                callVariableName: 'disableRemainingWeightHeuristic'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'arriveBy',
              value: {
                kind: 'CallVariable',
                callVariableName: 'arriveBy'
              }
            }, {
              kind: 'Call',
              metadata: {
                type: 'InputPreferred'
              },
              name: 'preferred',
              value: {
                kind: 'CallVariable',
                callVariableName: 'preferred'
              }
            }],
            children: [{
              children: [{
                fieldName: 'startTime',
                kind: 'Field',
                metadata: {},
                type: 'Long'
              }, {
                fieldName: 'endTime',
                kind: 'Field',
                metadata: {},
                type: 'Long'
              }, {
                children: [{
                  fieldName: 'realTime',
                  kind: 'Field',
                  metadata: {},
                  type: 'Boolean'
                }, {
                  fieldName: 'transitLeg',
                  kind: 'Field',
                  metadata: {},
                  type: 'Boolean'
                }, {
                  fieldName: 'mode',
                  kind: 'Field',
                  metadata: {},
                  type: 'Mode'
                }, {
                  fieldName: 'startTime',
                  kind: 'Field',
                  metadata: {},
                  type: 'Long'
                }, {
                  children: [{
                    fieldName: 'shortName',
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
                }],
                fieldName: 'legs',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  isPlural: true
                },
                type: 'Leg'
              }],
              fieldName: 'itineraries',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                isPlural: true
              },
              type: 'Itinerary'
            }],
            fieldName: 'plan',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true
            },
            type: 'Plan'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'FavouriteLocationContainer_PlanRelayQL',
          type: 'QueryType'
        };
      }();
    }
  },
  initialVariables: {
    from: null,
    to: null,
    numItineraries: 1,
    walkReluctance: 2.0001,
    walkBoardCost: 600,
    minTransferTime: 180,
    walkSpeed: 1.2,
    wheelchair: false,
    maxWalkDistance: 0,

    preferred: {
      agencies: ''
    },

    arriveBy: false,
    disableRemainingWeightHeuristic: false
  }
});