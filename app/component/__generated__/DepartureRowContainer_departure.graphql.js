/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type DepartureRowContainer_departure = {|
  +pattern: ?{|
    +route: {|
      +gtfsId: string;
      +shortName: ?string;
      +longName: ?string;
      +mode: ?string;
      +color: ?string;
      +alerts: ?$ReadOnlyArray<?{|
        +id: string;
        +effectiveStartDate: ?any;
        +effectiveEndDate: ?any;
      |}>;
      +agency: ?{|
        +name: string;
      |};
    |};
    +code: string;
  |};
  +stoptimes: ?$ReadOnlyArray<?{|
    +realtimeState: ?"SCHEDULED" | "UPDATED" | "CANCELED" | "ADDED" | "MODIFIED";
    +realtimeDeparture: ?number;
    +scheduledDeparture: ?number;
    +realtimeArrival: ?number;
    +scheduledArrival: ?number;
    +pickupType: ?"SCHEDULED" | "NONE" | "CALL_AGENCY" | "COORDINATE_WITH_DRIVER";
    +realtime: ?boolean;
    +serviceDay: ?any;
    +stopHeadsign: ?string;
    +stop: ?{|
      +code: ?string;
      +platformCode: ?string;
    |};
    +trip: ?{|
      +gtfsId: string;
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
  "name": "DepartureRowContainer_departure",
  "selections": [
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
                }
              ],
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
        }
      ],
      "storageKey": null
    },
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
          "name": "realtimeArrival",
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
          "name": "realtimeDeparture",
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
          "name": "serviceDay",
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
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "DepartureRow"
};

module.exports = fragment;
