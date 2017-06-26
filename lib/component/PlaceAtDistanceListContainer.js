import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import sortBy from 'lodash/sortBy';

import PlaceAtDistanceContainer from './PlaceAtDistanceContainer';
import { round } from './Distance';

export var placeAtDistanceListContainerFragment = function placeAtDistanceListContainerFragment(variables) {
  return function (RQL_0) {
    return {
      children: [{
        children: [{
          children: [].concat.apply([], [{
            fieldName: 'distance',
            kind: 'Field',
            metadata: {},
            type: 'Int'
          }, {
            children: [{
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
            }, {
              children: [{
                calls: [{
                  kind: 'Call',
                  metadata: {
                    type: 'Long'
                  },
                  name: 'startTime',
                  value: {
                    kind: 'CallVariable',
                    callVariableName: 'currentTime'
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
                    kind: 'CallValue',
                    callValue: 2
                  }
                }],
                children: [{
                  fieldName: 'pickupType',
                  kind: 'Field',
                  metadata: {},
                  type: 'PickupDropoffType'
                }, {
                  fieldName: 'serviceDay',
                  kind: 'Field',
                  metadata: {},
                  type: 'Long'
                }, {
                  fieldName: 'realtimeDeparture',
                  kind: 'Field',
                  metadata: {},
                  type: 'Int'
                }],
                fieldName: 'stoptimes',
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
              name: 'DepartureRow',
              type: 'DepartureRow'
            }],
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
          }, Relay.QL.__frag(RQL_0)]),
          fieldName: 'node',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            inferredRootCallName: 'node',
            inferredPrimaryKey: 'id',
            isRequisite: true
          },
          type: 'placeAtDistance'
        }, {
          fieldName: 'cursor',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'String'
        }],
        fieldName: 'edges',
        kind: 'Field',
        metadata: {
          canHaveSubselections: true,
          isPlural: true
        },
        type: 'placeAtDistanceEdge'
      }, {
        children: [{
          fieldName: 'hasNextPage',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'Boolean'
        }, {
          fieldName: 'hasPreviousPage',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'Boolean'
        }],
        fieldName: 'pageInfo',
        kind: 'Field',
        metadata: {
          canHaveSubselections: true,
          isGenerated: true,
          isRequisite: true
        },
        type: 'PageInfo'
      }],
      id: Relay.QL.__id(),
      kind: 'Fragment',
      metadata: {},
      name: 'PlaceAtDistanceListContainerRelayQL',
      type: 'placeAtDistanceConnection'
    };
  }(PlaceAtDistanceContainer.getFragment('placeAtDistance', {
    currentTime: variables.currentTime,
    timeRange: variables.timeRange }));
};

var testStopTimes = function testStopTimes(stoptimes) {
  return stoptimes && stoptimes.length > 0;
};

/* eslint-disable no-underscore-dangle */
var PlaceAtDistanceList = function PlaceAtDistanceList(_ref) {
  var places = _ref.places,
      currentTime = _ref.currentTime,
      timeRange = _ref.timeRange;

  if (places && places.edges) {
    return React.createElement(
      'div',
      null,
      sortBy(places.edges.filter(function (_ref2) {
        var node = _ref2.node;
        return node.place.__typename !== 'DepartureRow' || testStopTimes(node.place.stoptimes);
      }), [function (_ref3) {
        var node = _ref3.node;
        return round(node.distance);
      }, function (_ref4) {
        var node = _ref4.node;
        return testStopTimes(node.place.stoptimes) && node.place.stoptimes[0].serviceDay + node.place.stoptimes[0].realtimeDeparture;
      }]).map(function (_ref5) {
        var node = _ref5.node;
        return React.createElement(PlaceAtDistanceContainer, {
          key: node.place.id,
          currentTime: currentTime,
          timeRange: timeRange,
          placeAtDistance: node
        });
      })
    );
  }
  return null;
};
/* eslint-enable no-underscore-dangle */

PlaceAtDistanceList.propTypes = {
  places: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired,
  timeRange: PropTypes.number.isRequired
};

export default Relay.createContainer(PlaceAtDistanceList, {
  fragments: {
    places: placeAtDistanceListContainerFragment
  },

  initialVariables: {
    currentTime: 0,
    timeRange: 0
  }
});