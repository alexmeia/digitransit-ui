/**
 * @flow
 * @relayHash 128d0280a60710200fa538c3cf2fee96
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type NearestRoutesContainerQueryResponse = {|
  +places: ?{| |};
|};
*/


/*
query NearestRoutesContainerQuery(
  $lat: Float!
  $lon: Float!
  $currentTime: Long!
  $modes: [Mode!]
  $placeTypes: [FilterPlaceType!]
  $maxDistance: Int!
  $maxResults: Int!
  $timeRange: Int!
) {
  places: nearest(lat: $lat, lon: $lon, maxDistance: $maxDistance, maxResults: $maxResults, first: $maxResults, filterByModes: $modes, filterByPlaceTypes: $placeTypes) {
    ...PlaceAtDistanceListContainer_places
  }
}

fragment PlaceAtDistanceListContainer_places on placeAtDistanceConnection {
  edges {
    node {
      distance
      place {
        __typename
        id
        ... on DepartureRow {
          stoptimes(startTime: $currentTime, timeRange: $timeRange, numberOfDepartures: 2) {
            pickupType
            serviceDay
            realtimeDeparture
          }
        }
      }
      ...PlaceAtDistanceContainer_placeAtDistance
      id
    }
  }
}

fragment PlaceAtDistanceContainer_placeAtDistance on placeAtDistance {
  distance
  place {
    __typename
    id
    ...DepartureRowContainer_departure
    ...BicycleRentalStationRowContainer_station
  }
}

fragment DepartureRowContainer_departure on DepartureRow {
  pattern {
    route {
      gtfsId
      shortName
      longName
      mode
      color
      alerts {
        id
        effectiveStartDate
        effectiveEndDate
      }
      agency {
        name
        id
      }
      id
    }
    code
    id
  }
  stoptimes(startTime: $currentTime, timeRange: $timeRange, numberOfDepartures: 2) {
    pickupType
    realtimeState
    scheduledDeparture
    realtimeArrival
    scheduledArrival
    realtimeDeparture
    realtime
    serviceDay
    stopHeadsign
    stop {
      code
      platformCode
      id
    }
    trip {
      gtfsId
      id
    }
  }
}

fragment BicycleRentalStationRowContainer_station on BikeRentalStation {
  name
  stationId
  bikesAvailable
  spacesAvailable
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "lat",
        "type": "Float!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "lon",
        "type": "Float!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "currentTime",
        "type": "Long!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "modes",
        "type": "[Mode!]",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "placeTypes",
        "type": "[FilterPlaceType!]",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "maxDistance",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "maxResults",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "timeRange",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NearestRoutesContainerQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "places",
        "args": [
          {
            "kind": "Variable",
            "name": "filterByModes",
            "variableName": "modes",
            "type": "[Mode]"
          },
          {
            "kind": "Variable",
            "name": "filterByPlaceTypes",
            "variableName": "placeTypes",
            "type": "[FilterPlaceType]"
          },
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "maxResults",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "lat",
            "variableName": "lat",
            "type": "Float"
          },
          {
            "kind": "Variable",
            "name": "lon",
            "variableName": "lon",
            "type": "Float"
          },
          {
            "kind": "Variable",
            "name": "maxDistance",
            "variableName": "maxDistance",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "maxResults",
            "variableName": "maxResults",
            "type": "Int"
          }
        ],
        "concreteType": "placeAtDistanceConnection",
        "name": "nearest",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "PlaceAtDistanceListContainer_places",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "NearestRoutesContainerQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "lat",
        "type": "Float!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "lon",
        "type": "Float!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "currentTime",
        "type": "Long!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "modes",
        "type": "[Mode!]",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "placeTypes",
        "type": "[FilterPlaceType!]",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "maxDistance",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "maxResults",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "timeRange",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "NearestRoutesContainerQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "places",
        "args": [
          {
            "kind": "Variable",
            "name": "filterByModes",
            "variableName": "modes",
            "type": "[Mode]"
          },
          {
            "kind": "Variable",
            "name": "filterByPlaceTypes",
            "variableName": "placeTypes",
            "type": "[FilterPlaceType]"
          },
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "maxResults",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "lat",
            "variableName": "lat",
            "type": "Float"
          },
          {
            "kind": "Variable",
            "name": "lon",
            "variableName": "lon",
            "type": "Float"
          },
          {
            "kind": "Variable",
            "name": "maxDistance",
            "variableName": "maxDistance",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "maxResults",
            "variableName": "maxResults",
            "type": "Int"
          }
        ],
        "concreteType": "placeAtDistanceConnection",
        "name": "nearest",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "placeAtDistanceEdge",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "placeAtDistance",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "distance",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "name": "place",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "type": "BikeRentalStation",
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "name",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "stationId",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "bikesAvailable",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "spacesAvailable",
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "InlineFragment",
                        "type": "DepartureRow",
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "numberOfDepartures",
                                "value": 2,
                                "type": "Int"
                              },
                              {
                                "kind": "Variable",
                                "name": "startTime",
                                "variableName": "currentTime",
                                "type": "Long"
                              },
                              {
                                "kind": "Variable",
                                "name": "timeRange",
                                "variableName": "timeRange",
                                "type": "Int"
                              }
                            ],
                            "concreteType": "Stoptime",
                            "name": "stoptimes",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "realtimeArrival",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "pickupType",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "realtimeDeparture",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "realtimeState",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "scheduledDeparture",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "serviceDay",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "scheduledArrival",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "realtime",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "stopHeadsign",
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "Stop",
                                "name": "stop",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "code",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "platformCode",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "id",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "Trip",
                                "name": "trip",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "gtfsId",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "id",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "Pattern",
                            "name": "pattern",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "Route",
                                "name": "route",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "gtfsId",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "shortName",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "longName",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "mode",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "color",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Alert",
                                    "name": "alerts",
                                    "plural": true,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "id",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "effectiveStartDate",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "effectiveEndDate",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Agency",
                                    "name": "agency",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "name",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "id",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "id",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "code",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "id",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ]
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query NearestRoutesContainerQuery(\n  $lat: Float!\n  $lon: Float!\n  $currentTime: Long!\n  $modes: [Mode!]\n  $placeTypes: [FilterPlaceType!]\n  $maxDistance: Int!\n  $maxResults: Int!\n  $timeRange: Int!\n) {\n  places: nearest(lat: $lat, lon: $lon, maxDistance: $maxDistance, maxResults: $maxResults, first: $maxResults, filterByModes: $modes, filterByPlaceTypes: $placeTypes) {\n    ...PlaceAtDistanceListContainer_places\n  }\n}\n\nfragment PlaceAtDistanceListContainer_places on placeAtDistanceConnection {\n  edges {\n    node {\n      distance\n      place {\n        __typename\n        id\n        ... on DepartureRow {\n          stoptimes(startTime: $currentTime, timeRange: $timeRange, numberOfDepartures: 2) {\n            pickupType\n            serviceDay\n            realtimeDeparture\n          }\n        }\n      }\n      ...PlaceAtDistanceContainer_placeAtDistance\n      id\n    }\n  }\n}\n\nfragment PlaceAtDistanceContainer_placeAtDistance on placeAtDistance {\n  distance\n  place {\n    __typename\n    id\n    ...DepartureRowContainer_departure\n    ...BicycleRentalStationRowContainer_station\n  }\n}\n\nfragment DepartureRowContainer_departure on DepartureRow {\n  pattern {\n    route {\n      gtfsId\n      shortName\n      longName\n      mode\n      color\n      alerts {\n        id\n        effectiveStartDate\n        effectiveEndDate\n      }\n      agency {\n        name\n        id\n      }\n      id\n    }\n    code\n    id\n  }\n  stoptimes(startTime: $currentTime, timeRange: $timeRange, numberOfDepartures: 2) {\n    pickupType\n    realtimeState\n    scheduledDeparture\n    realtimeArrival\n    scheduledArrival\n    realtimeDeparture\n    realtime\n    serviceDay\n    stopHeadsign\n    stop {\n      code\n      platformCode\n      id\n    }\n    trip {\n      gtfsId\n      id\n    }\n  }\n}\n\nfragment BicycleRentalStationRowContainer_station on BikeRentalStation {\n  name\n  stationId\n  bikesAvailable\n  spacesAvailable\n}\n"
};

module.exports = batch;
