import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import { VectorTile } from 'vector-tile';
import Protobuf from 'pbf';
import pick from 'lodash/pick';

import { drawRoundIcon, drawTerminalIcon } from '../../../util/mapIconUtils';

var Stops = function () {
  function Stops(tile, config) {
    _classCallCheck(this, Stops);

    this.tile = tile;
    this.config = config;
    this.promise = this.getPromise();
  }

  Stops.prototype.drawStop = function drawStop(feature) {
    if (feature.properties.type === 'FERRY') {
      drawTerminalIcon(this.tile, feature.geom, feature.properties.type, this.tile.coords.z >= this.config.terminalNamesZoom ? feature.properties.name : false);
      return;
    }
    drawRoundIcon(this.tile, feature.geom, feature.properties.type, this.tile.props.hilightedStops && this.tile.props.hilightedStops.includes(feature.properties.gtfsId), feature.properties.platform !== 'null' ? feature.properties.platform : false);
  };

  Stops.prototype.getPromise = function getPromise() {
    var _this = this;

    return fetch('' + this.config.URL.STOP_MAP + (this.tile.coords.z + (this.tile.props.zoomOffset || 0)) + ('/' + this.tile.coords.x + '/' + this.tile.coords.y + '.pbf')).then(function (res) {
      if (res.status !== 200) {
        return undefined;
      }

      return res.arrayBuffer().then(function (buf) {
        var vt = new VectorTile(new Protobuf(buf));

        _this.features = [];

        if (vt.layers.stops != null && _this.tile.coords.z >= _this.config.stopsMinZoom) {
          for (var i = 0, ref = vt.layers.stops.length - 1; i <= ref; i++) {
            var feature = vt.layers.stops.feature(i);
            if (feature.properties.type && (feature.properties.parentStation === 'null' || _this.config.terminalStopsMaxZoom - 1 <= _this.tile.coords.z + (_this.tile.props.zoomOffset || 0))) {
              feature.geom = feature.loadGeometry()[0][0];
              _this.features.push(pick(feature, ['geom', 'properties']));
              _this.drawStop(feature);
            }
          }
        }
        if (vt.layers.stations != null && _this.config.terminalStopsMaxZoom > _this.tile.coords.z + (_this.tile.props.zoomOffset || 0) && _this.tile.coords.z >= _this.config.terminalStopsMinZoom) {
          for (var _i = 0, _ref = vt.layers.stations.length - 1; _i <= _ref; _i++) {
            var _feature = vt.layers.stations.feature(_i);
            if (_feature.properties.type) {
              _feature.geom = _feature.loadGeometry()[0][0];
              _this.features.unshift(pick(_feature, ['geom', 'properties']));
              drawTerminalIcon(_this.tile, _feature.geom, _feature.properties.type, _this.tile.coords.z >= _this.config.terminalNamesZoom ? _feature.properties.name : false);
            }
          }
        }
      }, function (err) {
        return console.log(err);
      });
    });
  };

  return Stops;
}();

Stops.getName = function () {
  return 'stop';
};

export default Stops;