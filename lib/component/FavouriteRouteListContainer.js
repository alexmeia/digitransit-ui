import Relay from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';

import NextDeparturesList, { relayFragment as NextDeparturesListRelayFragment } from './NextDeparturesList';
import { getDistanceToNearestStop } from '../util/geo-utils';

var getNextDepartures = function getNextDepartures(routes, lat, lon) {
  var nextDepartures = [];
  var seenDepartures = {};

  routes.forEach(function (route) {
    var hasDisruption = route.alerts.length > 0;

    route.patterns.forEach(function (pattern) {
      var closest = getDistanceToNearestStop(lat, lon, pattern.stops);
      closest.stop.stoptimes.filter(function (stoptime) {
        var seenKey = stoptime.pattern.route.gtfsId + ':' + stoptime.pattern.headsign;
        var isSeen = seenDepartures[seenKey];
        var isFavourite = stoptime.pattern.route.gtfsId === route.gtfsId && stoptime.pattern.headsign === pattern.headsign;

        if (!isSeen && isFavourite) {
          seenDepartures[seenKey] = true;
          return true;
        }
        return false;
      }).forEach(function (stoptime) {
        nextDepartures.push({
          distance: closest.distance,
          stoptime: stoptime,
          hasDisruption: hasDisruption
        });
      });
    });
  });

  return nextDepartures;
};

// TODO: This should be moved above in the component hierarchy
var FavouriteRouteListContainer = connectToStores(NextDeparturesList, ['TimeStore'], function (context, _ref) {
  var routes = _ref.routes;

  var PositionStore = context.getStore('PositionStore');
  var position = PositionStore.getLocationState();
  var origin = context.getStore('EndpointStore').getOrigin();
  var location = origin.useCurrentPosition ? position : origin;

  return {
    currentTime: context.getStore('TimeStore').getCurrentTime().unix(),
    departures: getNextDepartures(routes, location.lat, location.lon)
  };
});

// TODO: Add filtering in stoptimesForPatterns for route gtfsId
export default Relay.createContainer(FavouriteRouteListContainer, {
  fragments: {
    routes: function routes() {
      return function (RQL_0) {
        return {
          children: [{
            children: [{
              fieldName: 'id',
              kind: 'Field',
              metadata: {
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
              fieldName: 'headsign',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              children: [{
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
                alias: 'stoptimes',
                calls: [{
                  kind: 'Call',
                  metadata: {},
                  name: 'numberOfDepartures',
                  value: {
                    kind: 'CallValue',
                    callValue: 2
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
                }, {
                  kind: 'Call',
                  metadata: {},
                  name: 'timeRange',
                  value: {
                    kind: 'CallValue',
                    callValue: 7200
                  }
                }],
                children: [].concat.apply([], [{
                  children: [{
                    fieldName: 'headsign',
                    kind: 'Field',
                    metadata: {},
                    type: 'String'
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
                    fieldName: 'route',
                    kind: 'Field',
                    metadata: {
                      canHaveSubselections: true,
                      inferredRootCallName: 'node',
                      inferredPrimaryKey: 'id'
                    },
                    type: 'Route'
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
                }, Relay.QL.__frag(RQL_0)]),
                fieldName: 'stoptimesForPatterns',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  isPlural: true
                },
                type: 'StoptimesInPattern'
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
            fieldName: 'patterns',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id',
              isPlural: true
            },
            type: 'Pattern'
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
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {
            plural: true
          },
          name: 'FavouriteRouteListContainer_RoutesRelayQL',
          type: 'Route'
        };
      }(NextDeparturesListRelayFragment);
    }
  },

  initialVariables: {
    currentTime: '0'
  }
});