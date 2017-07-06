/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type PlaceAtDistanceListContainer_places = {|
  +edges: ?$ReadOnlyArray<?{|
    +node: ?{|
      +distance: ?number;
      +place: ?{|
        +id: string;
        +__typename: string;
        +stoptimes?: ?$ReadOnlyArray<?{|
          +pickupType: ?"SCHEDULED" | "NONE" | "CALL_AGENCY" | "COORDINATE_WITH_DRIVER";
          +serviceDay: ?any;
          +realtimeDeparture: ?number;
        |}>;
      |};
    |};
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "currentTime",
      "type": "Long"
    },
    {
      "kind": "RootArgument",
      "name": "timeRange",
      "type": "Int"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "PlaceAtDistanceListContainer_places",
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
                  "name": "id",
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "args": null,
                  "name": "__typename",
                  "storageKey": null
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
                          "name": "pickupType",
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
                          "name": "realtimeDeparture",
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
              "kind": "FragmentSpread",
              "name": "PlaceAtDistanceContainer_placeAtDistance",
              "args": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "placeAtDistanceConnection"
};

module.exports = fragment;
