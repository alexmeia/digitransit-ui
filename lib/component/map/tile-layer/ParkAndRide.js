import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import Relay from 'react-relay';
import { VectorTile } from 'vector-tile';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import Protobuf from 'pbf';

import { drawParkAndRideIcon } from '../../../util/mapIconUtils';
import { Contour } from '../../../util/geo-utils';
import { isBrowser } from '../../../util/browser';

var showFacilities = 17;

var ParkAndRide = function () {
  function ParkAndRide(tile, config) {
    _classCallCheck(this, ParkAndRide);

    this.tile = tile;
    this.config = config;
    var scaleratio = isBrowser && window.devicePixelRatio || 1;
    this.width = 24 * scaleratio;
    this.height = 12 * scaleratio;
    this.promise = this.getPromise();
  }

  ParkAndRide.prototype.getPromise = function getPromise() {
    var _this = this;

    return fetch('' + this.config.URL.PARK_AND_RIDE_MAP + (this.tile.coords.z + (this.tile.props.zoomOffset || 0)) + ('/' + this.tile.coords.x + '/' + this.tile.coords.y + '.pbf')).then(function (res) {
      if (res.status !== 200) {
        return undefined;
      }

      return res.arrayBuffer().then(function (buf) {
        var vt = new VectorTile(new Protobuf(buf));

        _this.features = [];

        if (_this.tile.coords.z < showFacilities && vt.layers.hubs != null) {
          var _loop = function _loop(i, ref) {
            var feature = vt.layers.hubs.feature(i);
            var query = Relay.createQuery(function () {
              return {
                calls: [{
                  kind: 'Call',
                  metadata: {
                    type: '[String]'
                  },
                  name: 'ids',
                  value: {
                    kind: 'CallVariable',
                    callVariableName: 'ids'
                  }
                }],
                children: [{
                  fieldName: 'name',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'maxCapacity',
                  kind: 'Field',
                  metadata: {},
                  type: 'Int'
                }, {
                  fieldName: 'spacesAvailable',
                  kind: 'Field',
                  metadata: {},
                  type: 'Int'
                }, {
                  fieldName: 'realtime',
                  kind: 'Field',
                  metadata: {},
                  type: 'Boolean'
                }, {
                  fieldName: 'id',
                  kind: 'Field',
                  metadata: {
                    isGenerated: true,
                    isRequisite: true
                  },
                  type: 'ID'
                }],
                fieldName: 'carParks',
                kind: 'Query',
                metadata: {
                  isPlural: true,
                  identifyingArgName: 'ids',
                  identifyingArgType: '[String]'
                },
                name: 'ParkAndRide',
                type: 'CarPark'
              };
            }(), { ids: JSON.parse(feature.properties.facilityIds) });
            Relay.Store.primeCache({
              query: query
            }, function (readyState) {
              if (readyState.done) {
                var result = compact(Relay.Store.readQuery(query));
                if (!isEmpty(result)) {
                  feature.properties.facilities = result;
                  feature.geom = feature.loadGeometry()[0][0];
                  _this.features.push(pick(feature, ['geom', 'properties']));
                  drawParkAndRideIcon(_this.tile, feature.geom, _this.width, _this.height);
                }
              }
            });
          };

          for (var i = 0, ref = vt.layers.hubs.length - 1; i <= ref; i++) {
            _loop(i, ref);
          }
        } else if (_this.tile.coords.z >= showFacilities && vt.layers.facilities != null) {
          var _loop2 = function _loop2(i, ref) {
            var feature = vt.layers.facilities.feature(i);
            var query = Relay.createQuery(function () {
              return {
                calls: [{
                  kind: 'Call',
                  metadata: {
                    type: 'String!'
                  },
                  name: 'id',
                  value: {
                    kind: 'CallVariable',
                    callVariableName: 'id'
                  }
                }],
                children: [{
                  fieldName: 'name',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'maxCapacity',
                  kind: 'Field',
                  metadata: {},
                  type: 'Int'
                }, {
                  fieldName: 'spacesAvailable',
                  kind: 'Field',
                  metadata: {},
                  type: 'Int'
                }, {
                  fieldName: 'realtime',
                  kind: 'Field',
                  metadata: {},
                  type: 'Boolean'
                }, {
                  fieldName: 'id',
                  kind: 'Field',
                  metadata: {
                    isGenerated: true,
                    isRequisite: true
                  },
                  type: 'ID'
                }],
                fieldName: 'carPark',
                kind: 'Query',
                metadata: {
                  identifyingArgName: 'id',
                  identifyingArgType: 'String!'
                },
                name: 'ParkAndRide',
                type: 'CarPark'
              };
            }(), { id: feature.id });
            Relay.Store.primeCache({
              query: query
            }, function (readyState) {
              if (readyState.done) {
                var result = compact(Relay.Store.readQuery(query));
                if (result != null && result.length !== 0) {
                  feature.properties.facility = result;
                  feature.geom = new Contour(feature.loadGeometry()[0]).centroid();
                  _this.features.push(feature);
                  drawParkAndRideIcon(_this.tile, feature.geom, _this.width, _this.height);
                }
              }
            });
          };

          for (var i = 0, ref = vt.layers.facilities.length - 1; i <= ref; i++) {
            _loop2(i, ref);
          }
        }
      }, function (err) {
        return console.log(err);
      });
    });
  };

  return ParkAndRide;
}();

ParkAndRide.getName = function () {
  return 'parkAndRide';
};

export default ParkAndRide;