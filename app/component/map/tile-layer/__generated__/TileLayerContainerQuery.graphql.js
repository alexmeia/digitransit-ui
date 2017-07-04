/**
 * @flow
 * @relayHash e25baf8184f9d9b4a0b556970b0d1bc8
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type TileLayerContainerQueryResponse = {|
  +station: ?{| |};
|};
*/


/*
query TileLayerContainerQuery(
  $stationId: String!
) {
  station: bikeRentalStation(id: $stationId) {
    ...CityBikePopup_station
    id
  }
}

fragment CityBikePopup_station on BikeRentalStation {
  stationId
  name
  lat
  lon
  bikesAvailable
  spacesAvailable
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "stationId",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TileLayerContainerQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "station",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "stationId",
            "type": "String!"
          }
        ],
        "concreteType": "BikeRentalStation",
        "name": "bikeRentalStation",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CityBikePopup_station",
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
  "name": "TileLayerContainerQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "stationId",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "TileLayerContainerQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "station",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "stationId",
            "type": "String!"
          }
        ],
        "concreteType": "BikeRentalStation",
        "name": "bikeRentalStation",
        "plural": false,
        "selections": [
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
            "name": "name",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "lat",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "lon",
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
  },
  "text": "query TileLayerContainerQuery(\n  $stationId: String!\n) {\n  station: bikeRentalStation(id: $stationId) {\n    ...CityBikePopup_station\n    id\n  }\n}\n\nfragment CityBikePopup_station on BikeRentalStation {\n  stationId\n  name\n  lat\n  lon\n  bikesAvailable\n  spacesAvailable\n}\n"
};

module.exports = batch;
