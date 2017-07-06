/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type NearbyRouteListContainer_nearest = {|
  +places: ?{| |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "lat",
      "type": "Float"
    },
    {
      "kind": "RootArgument",
      "name": "lon",
      "type": "Float"
    },
    {
      "kind": "RootArgument",
      "name": "maxDistance",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "maxResults",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "modes",
      "type": "[Mode]"
    },
    {
      "kind": "RootArgument",
      "name": "placeTypes",
      "type": "[FilterPlaceType]"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "NearbyRouteListContainer_nearest",
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
};

module.exports = fragment;
