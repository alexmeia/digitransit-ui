import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import flatten from 'lodash/flatten';
import omit from 'lodash/omit';
import L from 'leaflet';

import { isBrowser } from '../../../util/browser';

var TileContainer = function TileContainer(coords, done, props, config) {
  var _this = this;

  _classCallCheck(this, TileContainer);

  this.project = function (point) {
    var size = _this.extent * Math.pow(2, _this.coords.z + (_this.props.zoomOffset || 0));
    var x0 = _this.extent * _this.coords.x;
    var y0 = _this.extent * _this.coords.y;
    var y1 = 180 - (point.y + y0) * 360 / size;
    return {
      lon: (point.x + x0) * 360 / size - 180,
      lat: 360 / Math.PI * Math.atan(Math.exp(y1 * (Math.PI / 180))) - 90
    };
  };

  this.createElement = function () {
    var el = document.createElement('canvas');
    el.setAttribute('class', 'leaflet-tile');
    el.setAttribute('height', _this.tileSize);
    el.setAttribute('width', _this.tileSize);
    el.onMapClick = _this.onMapClick;
    return el;
  };

  this.onMapClick = function (e, point) {
    var nearest = void 0;
    var features = void 0;
    var localPoint = void 0;

    if (_this.layers) {
      localPoint = [point[0] * _this.scaleratio % _this.tileSize, point[1] * _this.scaleratio % _this.tileSize];

      features = flatten(_this.layers.map(function (layer) {
        return layer.features && layer.features.map(function (feature) {
          return {
            layer: layer.constructor.getName(),
            feature: feature
          };
        });
      }));

      nearest = features.filter(function (feature) {
        if (!feature) {
          return false;
        }

        var g = feature.feature.geom;

        var dist = Math.sqrt(Math.pow(localPoint[0] - g.x / _this.ratio, 2) + Math.pow(localPoint[1] - g.y / _this.ratio, 2));

        if (dist < 22 * _this.scaleratio) {
          return true;
        }
        return false;
      });

      if (nearest.length === 0 && e.type === 'click') {
        return _this.onSelectableTargetClicked(false, e.latlng); // close any open menu
      } else if (nearest.length === 0 && e.type === 'contextmenu') {
        return _this.onSelectableTargetClicked([], e.latlng); // open menu for no stop
      } else if (nearest.length === 1) {
        L.DomEvent.stopPropagation(e);
        // open menu for single stop
        var latLon = L.latLng(_this.project(nearest[0].feature.geom));
        return _this.onSelectableTargetClicked(nearest, latLon);
      }
      L.DomEvent.stopPropagation(e);
      return _this.onSelectableTargetClicked(nearest, e.latlng); // open menu for a list of stops
    }
    return false;
  };

  var markersMinZoom = Math.min(config.cityBike.cityBikeMinZoom, config.stopsMinZoom, config.terminalStopsMinZoom);

  this.coords = coords;
  this.props = props;
  this.extent = 4096;
  this.scaleratio = isBrowser && window.devicePixelRatio || 1;
  this.tileSize = (this.props.tileSize || 256) * this.scaleratio;
  this.ratio = this.extent / this.tileSize;
  this.el = this.createElement();

  if (this.coords.z < markersMinZoom || !this.el.getContext) {
    setTimeout(function () {
      return done(null, _this.el);
    }, 0);
    return;
  }

  this.ctx = this.el.getContext('2d');

  this.layers = this.props.layers.filter(function (Layer) {
    if (Layer.getName() === 'stop' && (_this.coords.z >= config.stopsMinZoom || _this.coords.z >= config.terminalStopsMinZoom)) {
      return true;
    } else if (Layer.getName() === 'citybike' && _this.coords.z >= config.cityBike.cityBikeMinZoom) {
      return true;
    } else if (Layer.getName() === 'parkAndRide' && _this.coords.z >= config.parkAndRide.parkAndRideMinZoom) {
      return true;
    } else if (Layer.getName() === 'ticketSales' && _this.coords.z >= config.ticketSales.ticketSalesMinZoom) {
      return true;
    }
    return false;
  }).map(function (Layer) {
    return new Layer(_this, config);
  });

  this.el.layers = this.layers.map(function (layer) {
    return omit(layer, 'tile');
  });

  Promise.all(this.layers.map(function (layer) {
    return layer.promise;
  })).then(function () {
    return done(null, _this.el);
  });
};

export default TileContainer;