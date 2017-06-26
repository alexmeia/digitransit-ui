import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import { VectorTile } from 'vector-tile';
import Protobuf from 'pbf';
import Relay from 'react-relay';
import glfun from 'mapbox-gl-function';
import pick from 'lodash/pick';

import { isBrowser } from '../../../util/browser';
import { drawRoundIcon, drawCitybikeIcon, drawCitybikeNotInUseIcon, drawAvailabilityBadge } from '../../../util/mapIconUtils';

var getScale = glfun({
  type: 'exponential',
  base: 1,
  domain: [13, 20],
  range: [0.8, 1.6]
});

var timeOfLastFetch = {};

var CityBikes = function CityBikes(tile, config) {
  var _this = this;

  _classCallCheck(this, CityBikes);

  this.fetchWithAction = function (actionFn) {
    return fetch('' + _this.config.URL.CITYBIKE_MAP + (_this.tile.coords.z + (_this.tile.props.zoomOffset || 0) + '/') + (_this.tile.coords.x + '/' + _this.tile.coords.y + '.pbf')).then(function (res) {
      if (res.status !== 200) {
        return undefined;
      }

      return res.arrayBuffer().then(function (buf) {
        var vt = new VectorTile(new Protobuf(buf));

        _this.features = [];

        if (vt.layers.stations != null) {
          for (var i = 0, ref = vt.layers.stations.length - 1; i <= ref; i++) {
            var feature = vt.layers.stations.feature(i);
            feature.geom = feature.loadGeometry()[0][0];
            _this.features.push(pick(feature, ['geom', 'properties']));
          }
        }

        _this.features.forEach(actionFn);
      }, function (err) {
        return console.log(err);
      });
    });
  };

  this.fetchAndDrawStatus = function (feature) {
    var geom = feature.geom;
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
          fieldName: 'bikesAvailable',
          kind: 'Field',
          metadata: {},
          type: 'Int'
        }, {
          fieldName: 'spacesAvailable',
          kind: 'Field',
          metadata: {},
          type: 'Int'
        }, {
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        fieldName: 'bikeRentalStation',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'Test',
        type: 'BikeRentalStation'
      };
    }(), { id: feature.properties.id });

    var lastFetch = timeOfLastFetch[feature.properties.id];
    var currentTime = new Date().getTime();

    var callback = function callback(readyState) {
      if (readyState.done) {
        timeOfLastFetch[feature.properties.id] = new Date().getTime();
        var result = Relay.Store.readQuery(query)[0];

        if (result.bikesAvailable === 0 && result.spacesAvailable === 0) {
          drawCitybikeNotInUseIcon(_this.tile, geom, _this.notInUseImageSize);
        } else if (result.bikesAvailable > _this.config.cityBike.fewAvailableCount) {
          drawAvailabilityBadge('good', _this.tile, geom, _this.citybikeImageSize, _this.availabilityImageSize, _this.scaleratio);
        } else if (result.bikesAvailable > 0) {
          drawAvailabilityBadge('poor', _this.tile, geom, _this.citybikeImageSize, _this.availabilityImageSize, _this.scaleratio);
        } else {
          drawAvailabilityBadge('no', _this.tile, geom, _this.citybikeImageSize, _this.availabilityImageSize, _this.scaleratio);
        }
      }
    };

    if (lastFetch && currentTime - lastFetch <= 30000) {
      Relay.Store.primeCache({
        query: query
      }, callback);
    } else {
      Relay.Store.forceFetch({
        query: query
      }, callback);
    }
  };

  this.addFeature = function (feature) {
    if (_this.tile.coords.z <= _this.config.cityBike.cityBikeSmallIconZoom) {
      drawRoundIcon(_this.tile, feature.geom, 'citybike');
    } else {
      drawCitybikeIcon(_this.tile, feature.geom, _this.citybikeImageSize);
      _this.fetchAndDrawStatus(feature);
    }
  };

  this.onTimeChange = function () {
    if (_this.tile.coords.z > _this.config.cityBike.cityBikeSmallIconZoom) {
      _this.fetchWithAction(_this.fetchAndDrawStatus);
    }
  };

  this.tile = tile;
  this.config = config;

  this.scaleratio = isBrowser && window.devicePixelRatio || 1;
  this.citybikeImageSize = 16 * this.scaleratio * getScale({ $zoom: this.tile.coords.z });
  this.availabilityImageSize = 8 * this.scaleratio * getScale({ $zoom: this.tile.coords.z });
  this.notInUseImageSize = 12 * this.scaleratio * getScale({ $zoom: this.tile.coords.z });

  this.promise = this.fetchWithAction(this.addFeature);
};

CityBikes.getName = function () {
  return 'citybike';
};

export default CityBikes;