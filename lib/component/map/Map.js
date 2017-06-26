import _extends from 'babel-runtime/helpers/extends';
import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import elementResizeDetectorMaker from 'element-resize-detector';

import PositionMarker from './PositionMarker';
import PlaceMarker from './PlaceMarker';
import { boundWithMinimumArea } from '../../util/geo-utils';
import LazilyLoad, { importLazy } from '../LazilyLoad';
import { isBrowser, isDebugTiles } from '../../util/browser';
import Icon from '../Icon';

/* eslint-disable global-require */
// TODO When server side rendering is re-enabled,
//      these need to be loaded only when isBrowser is true.
//      Perhaps still using the require from webpack?
var LeafletMap = void 0;
var TileLayer = void 0;
var AttributionControl = void 0;
var ScaleControl = void 0;
var ZoomControl = void 0;
var L = void 0;

if (isBrowser) {
  LeafletMap = require('react-leaflet/lib/Map').default;
  TileLayer = require('react-leaflet/lib/TileLayer').default;
  AttributionControl = require('react-leaflet/lib/AttributionControl').default;
  ScaleControl = require('react-leaflet/lib/ScaleControl').default;
  ZoomControl = require('react-leaflet/lib/ZoomControl').default;
  L = require('leaflet');
  // Webpack handles this by bundling it with the other css files
  require('leaflet/dist/leaflet.css');
}

var Map = function (_React$Component) {
  _inherits(Map, _React$Component);

  function Map() {
    var _temp, _this, _ret;

    _classCallCheck(this, Map);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.componentDidMount = function () {
      _this.erd = elementResizeDetectorMaker({ strategy: 'scroll' });
      /* eslint-disable no-underscore-dangle */
      _this.erd.listenTo(_this.map.leafletElement._container, _this.resizeMap);
    }, _this.componentWillUnmount = function () {
      _this.erd.removeListener(_this.map.leafletElement._container, _this.resizeMap);
    }, _this.resizeMap = function () {
      if (_this.map) {
        _this.map.leafletElement.invalidateSize(false);
        if (_this.props.fitBounds) {
          _this.map.leafletElement.fitBounds(boundWithMinimumArea(_this.props.bounds), _this.props.boundsOptions);
        }
      }
    }, _this.vectorTileLayerContainerModules = { VectorTileLayerContainer: function VectorTileLayerContainer() {
        return importLazy(System.import('./tile-layer/VectorTileLayerContainer'));
      }
    }, _this.stopMarkerContainerModules = { StopMarkerContainer: function StopMarkerContainer() {
        return importLazy(System.import('./non-tile-layer/StopMarkerContainer'));
      }
    }, _this.cityBikeMarkerContainerModules = { CityBikeMarkerContainer: function CityBikeMarkerContainer() {
        return importLazy(System.import('./non-tile-layer/CityBikeMarkerContainer'));
      }
    }, _this.renderVectorTileLayerContainer = function (_ref) {
      var VectorTileLayerContainer = _ref.VectorTileLayerContainer;
      return React.createElement(VectorTileLayerContainer, {
        hilightedStops: _this.props.hilightedStops,
        showStops: _this.props.showStops,
        disableMapTracking: _this.props.disableMapTracking
      });
    }, _this.renderStopMarkerContainer = function (_ref2) {
      var StopMarkerContainer = _ref2.StopMarkerContainer;
      return React.createElement(StopMarkerContainer, {
        hilightedStops: _this.props.hilightedStops,
        disableMapTracking: _this.props.disableMapTracking,
        updateWhenIdle: false
      });
    }, _this.renderCityBikeMarkerContainer = function (_ref3) {
      var CityBikeMarkerContainer = _ref3.CityBikeMarkerContainer;
      return React.createElement(CityBikeMarkerContainer, null);
    }, _this.render = function () {
      var map = void 0;
      var zoom = void 0;
      var origin = void 0;
      var leafletObjs = void 0;
      var config = _this.context.config;

      if (isBrowser) {
        leafletObjs = _this.props.leafletObjs || [];

        if (config.map.useVectorTiles) {
          leafletObjs.push(React.createElement(
            LazilyLoad,
            { key: 'vector-tiles', modules: _this.vectorTileLayerContainerModules },
            _this.renderVectorTileLayerContainer
          ));
        } else if (_this.props.showStops) {
          leafletObjs.push(React.createElement(
            LazilyLoad,
            { key: 'stop-layer', modules: _this.stopMarkerContainerModules },
            _this.renderStopMarkerContainer
          ));

          if (config.cityBike.showCityBikes) {
            leafletObjs.push(React.createElement(
              LazilyLoad,
              { key: 'citybikes', modules: _this.cityBikeMarkerContainerModules },
              _this.renderCityBikeMarkerContainer
            ));
          }
        }

        origin = _this.context.getStore('EndpointStore').getOrigin();

        if (origin && origin.lat && !_this.props.hideOrigin) {
          leafletObjs.push(React.createElement(PlaceMarker, {
            position: origin,
            key: 'from',
            displayOriginPopup: _this.props.displayOriginPopup
          }));
        }

        leafletObjs.push(React.createElement(PositionMarker, { key: 'position', displayOriginPopup: _this.props.displayOriginPopup }));

        var center = !_this.props.fitBounds && _this.props.lat && _this.props.lon && [_this.props.lat, _this.props.lon] || null;

        zoom = _this.props.zoom;


        var boundsOptions = _this.props.boundsOptions;

        if (_this.props.padding) {
          boundsOptions.paddingTopLeft = _this.props.padding;
        }

        var mapUrl = isDebugTiles && config.URL.OTP + 'inspector/tile/traversal/' || config.URL.MAP;
        if (mapUrl !== null && (typeof mapUrl === 'undefined' ? 'undefined' : _typeof(mapUrl)) === 'object') {
          mapUrl = mapUrl[_this.context.getStore('PreferencesStore').getLanguage()] || config.URL.MAP.default;
        }

        map = React.createElement(
          LeafletMap,
          _extends({
            keyboard: false,
            ref: function ref(el) {
              _this.map = el;
            },
            center: center,
            zoom: zoom,
            minZoom: _this.context.config.map.minZoom,
            maxZoom: _this.context.config.map.maxZoom,
            zoomControl: false,
            attributionControl: false,
            bounds: _this.props.fitBounds && boundWithMinimumArea(_this.props.bounds) || undefined,
            animate: true
          }, _this.props.leafletOptions, {
            boundsOptions: boundsOptions
          }, _this.props.leafletEvents),
          React.createElement(TileLayer, {
            url: mapUrl + '{z}/{x}/{y}{size}.png',
            tileSize: config.map.tileSize || 256,
            zoomOffset: config.map.zoomOffset || 0,
            updateWhenIdle: false,
            size: config.map.useRetinaTiles && L.Browser.retina && !isDebugTiles ? '@2x' : '',
            minZoom: _this.context.config.map.minZoom,
            maxZoom: _this.context.config.map.maxZoom
          }),
          React.createElement(AttributionControl, {
            position: 'bottomleft',
            prefix: '\xA9 <a tabindex="-1" href="http://osm.org/copyright">OpenStreetMap</a>'
          }),
          _this.props.showScaleBar && React.createElement(ScaleControl, { imperial: false, position: config.map.controls.scale.position }),
          _this.context.breakpoint === 'large' && React.createElement(ZoomControl, {
            position: config.map.controls.zoom.position,
            zoomInText: Icon.asString('icon-icon_plus'),
            zoomOutText: Icon.asString('icon-icon_minus')
          }),
          leafletObjs
        );
      }
      return React.createElement(
        'div',
        { className: 'map ' + (_this.props.className ? _this.props.className : '') },
        map,
        React.createElement('div', { className: 'background-gradient' }),
        _this.props.children
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Map;
}(React.Component);

Map.propTypes = {
  bounds: PropTypes.array,
  boundsOptions: PropTypes.object,
  center: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  disableMapTracking: PropTypes.func,
  displayOriginPopup: PropTypes.bool,
  fitBounds: PropTypes.bool,
  hideOrigin: PropTypes.bool,
  hilightedStops: PropTypes.array,
  lat: PropTypes.number,
  lon: PropTypes.number,
  leafletEvents: PropTypes.object,
  leafletObjs: PropTypes.array,
  leafletOptions: PropTypes.object,
  padding: PropTypes.array,
  showStops: PropTypes.bool,
  zoom: PropTypes.number,
  showScaleBar: PropTypes.bool
};
Map.defaultProps = {
  showScaleBar: false
};
Map.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  piwik: PropTypes.object,
  config: PropTypes.object.isRequired,
  breakpoint: PropTypes.string.isRequired
};


export default Map;