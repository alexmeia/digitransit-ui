/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type PlaceAtDistanceContainer_placeAtDistance = {|
  +distance: ?number;
  +place: ?{|
    +id: string;
    +__typename: string;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PlaceAtDistanceContainer_placeAtDistance",
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
          "kind": "FragmentSpread",
          "name": "DepartureRowContainer_departure",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "BicycleRentalStationRowContainer_station",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "placeAtDistance"
};

module.exports = fragment;
