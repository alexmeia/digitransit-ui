import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import Popup from 'react-leaflet/lib/Popup';
import { intlShape } from 'react-intl';
import MapLayer from 'react-leaflet/lib/MapLayer';
import omit from 'lodash/omit';
import provideContext from 'fluxible-addons-react/provideContext';
import SphericalMercator from '@mapbox/sphericalmercator';
import lodashFilter from 'lodash/filter';
import L from 'leaflet';

import StopRoute from '../../../route/StopRoute';
import TerminalRoute from '../../../route/TerminalRoute';
import CityBikeRoute from '../../../route/CityBikeRoute';
import StopMarkerPopup from '../popups/StopMarkerPopup';
import MarkerSelectPopup from './MarkerSelectPopup';
import CityBikePopup from '../popups/CityBikePopup';
import ParkAndRideHubPopup from '../popups/ParkAndRideHubPopup';
import ParkAndRideFacilityPopup from '../popups/ParkAndRideFacilityPopup';
import ParkAndRideHubRoute from '../../../route/ParkAndRideHubRoute';
import ParkAndRideFacilityRoute from '../../../route/ParkAndRideFacilityRoute';
import TicketSalesPopup from '../popups/TicketSalesPopup';
import LocationPopup from '../popups/LocationPopup';
import TileContainer from './TileContainer';
import Loading from '../../Loading';

var StopMarkerPopupWithContext = provideContext(StopMarkerPopup, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
});

var MarkerSelectPopupWithContext = provideContext(MarkerSelectPopup, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
});

var CityBikePopupWithContext = provideContext(CityBikePopup, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  getStore: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
});

var ParkAndRideHubPopupWithContext = provideContext(ParkAndRideHubPopup, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  getStore: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
});

var ParkAndRideFacilityPopupWithContext = provideContext(ParkAndRideFacilityPopup, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  getStore: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
});

var TicketSalesPopupWithContext = provideContext(TicketSalesPopup, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  getStore: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
});

var LocationPopupWithContext = provideContext(LocationPopup, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
});

var PopupOptions = {
  offset: [110, 16],
  closeButton: false,
  minWidth: 260,
  maxWidth: 260,
  autoPanPaddingTopLeft: [5, 125],
  className: 'popup',
  ref: 'popup'
};

// TODO eslint doesn't know that TileLayerContainer is a react component,
//      because it doesn't inherit it directly. This will force the detection
/** @extends React.Component */

var TileLayerContainer = function (_MapLayer) {
  _inherits(TileLayerContainer, _MapLayer);

  function TileLayerContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, TileLayerContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _MapLayer.call.apply(_MapLayer, [this].concat(args))), _this), _this.state = {
      stops: undefined,
      coords: undefined
    }, _this.onTimeChange = function (e) {
      var activeTiles = void 0;

      if (e.currentTime) {
        /* eslint-disable no-underscore-dangle */
        activeTiles = lodashFilter(_this.leafletElement._tiles, function (tile) {
          return tile.active;
        });
        /* eslint-enable no-underscore-dangle */
        activeTiles.forEach(function (tile) {
          return tile.el.layers && tile.el.layers.forEach(function (layer) {
            if (layer.onTimeChange) {
              layer.onTimeChange();
            }
          });
        });
      }
    }, _this.onClick = function (e) {
      /* eslint-disable no-underscore-dangle */
      Object.keys(_this.leafletElement._tiles).filter(function (key) {
        return _this.leafletElement._tiles[key].active;
      }).filter(function (key) {
        return _this.leafletElement._keyToBounds(key).contains(e.latlng);
      }).forEach(function (key) {
        return _this.leafletElement._tiles[key].el.onMapClick(e, _this.merc.px([e.latlng.lng, e.latlng.lat], Number(key.split(':')[2]) + _this.props.zoomOffset));
      });
      /* eslint-enable no-underscore-dangle */
    }, _this.merc = new SphericalMercator({
      size: _this.props.tileSize || 256
    }), _this.createTile = function (tileCoords, done) {
      var tile = new TileContainer(tileCoords, done, _this.props, _this.context.config);

      tile.onSelectableTargetClicked = function (selectableTargets, coords) {
        if (selectableTargets && _this.props.disableMapTracking) {
          _this.props.disableMapTracking(); // disable now that popup opens
        }

        _this.setState({
          selectableTargets: selectableTargets,
          coords: coords
        });
      };

      return tile.el;
    }, _this.selectRow = function (option) {
      return _this.setState({ selectableTargets: [option] });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TileLayerContainer.prototype.componentWillMount = function componentWillMount() {
    _MapLayer.prototype.componentWillMount.call(this);
    this.context.getStore('TimeStore').addChangeListener(this.onTimeChange);

    // TODO: Convert to use react-leaflet <GridLayer>
    var Layer = L.GridLayer.extend({ createTile: this.createTile });

    this.leafletElement = new Layer(omit(this.props, 'map'));
    this.context.map.addEventParent(this.leafletElement);

    this.leafletElement.on('click contextmenu', this.onClick);
  };

  TileLayerContainer.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.context.popupContainer != null) {
      this.context.popupContainer.openPopup();
    }
  };

  TileLayerContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.context.getStore('TimeStore').removeChangeListener(this.onTimeChange);
    this.leafletElement.off('click contextmenu', this.onClick);
  };

  TileLayerContainer.prototype.render = function render() {
    var _this2 = this;

    var popup = null;
    var contents = void 0;

    var loadingPopup = function loadingPopup() {
      return React.createElement(
        'div',
        { className: 'card', style: { height: '12rem' } },
        React.createElement(Loading, null)
      );
    };

    if (typeof this.state.selectableTargets !== 'undefined') {
      if (this.state.selectableTargets.length === 1) {
        var id = void 0;
        if (this.state.selectableTargets[0].layer === 'stop') {
          id = this.state.selectableTargets[0].feature.properties.gtfsId;
          contents = React.createElement(Relay.RootContainer, {
            Component: StopMarkerPopup,
            route: this.state.selectableTargets[0].feature.properties.stops ? new TerminalRoute({
              terminalId: id,
              currentTime: this.context.getStore('TimeStore').getCurrentTime().unix()
            }) : new StopRoute({
              stopId: id,
              currentTime: this.context.getStore('TimeStore').getCurrentTime().unix()
            }),
            renderLoading: loadingPopup,
            renderFetched: function renderFetched(data) {
              return React.createElement(StopMarkerPopupWithContext, _extends({}, data, { context: _this2.context }));
            }
          });
        } else if (this.state.selectableTargets[0].layer === 'citybike') {
          id = this.state.selectableTargets[0].feature.properties.id;
          contents = React.createElement(Relay.RootContainer, {
            Component: CityBikePopup,
            forceFetch: true,
            route: new CityBikeRoute({
              stationId: id
            }),
            renderLoading: loadingPopup,
            renderFetched: function renderFetched(data) {
              return React.createElement(CityBikePopupWithContext, _extends({}, data, { context: _this2.context }));
            }
          });
        } else if (this.state.selectableTargets[0].layer === 'parkAndRide' && this.state.selectableTargets[0].feature.properties.facilityIds) {
          id = this.state.selectableTargets[0].feature.properties.facilityIds;
          contents = React.createElement(Relay.RootContainer, {
            Component: ParkAndRideHubPopup,
            forceFetch: true,
            route: new ParkAndRideHubRoute({ stationIds: JSON.parse(id) }),
            renderLoading: loadingPopup,
            renderFetched: function renderFetched(data) {
              return React.createElement(ParkAndRideHubPopupWithContext, _extends({
                name: JSON.parse(_this2.state.selectableTargets[0].feature.properties.name)[_this2.context.intl.locale],
                lat: _this2.state.coords.lat,
                lon: _this2.state.coords.lng
              }, data, {
                context: _this2.context
              }));
            }
          });
        } else if (this.state.selectableTargets[0].layer === 'parkAndRide') {
          id = this.state.selectableTargets[0].feature.id;
          contents = React.createElement(Relay.RootContainer, {
            Component: ParkAndRideFacilityPopup,
            forceFetch: true,
            route: new ParkAndRideFacilityRoute({ id: id }),
            renderLoading: loadingPopup,
            renderFetched: function renderFetched(data) {
              return React.createElement(ParkAndRideFacilityPopupWithContext, _extends({
                name: JSON.parse(_this2.state.selectableTargets[0].feature.properties.name)[_this2.context.intl.locale],
                lat: _this2.state.coords.lat,
                lon: _this2.state.coords.lng
              }, data, {
                context: _this2.context
              }));
            }
          });
        } else if (this.state.selectableTargets[0].layer === 'ticketSales') {
          id = this.state.selectableTargets[0].feature.properties.FID;
          contents = React.createElement(TicketSalesPopupWithContext, _extends({}, this.state.selectableTargets[0].feature.properties, {
            context: this.context
          }));
        }
        popup = React.createElement(
          Popup,
          _extends({}, PopupOptions, {
            key: id,
            position: this.state.coords
          }),
          contents
        );
      } else if (this.state.selectableTargets.length > 1) {
        popup = React.createElement(
          Popup,
          _extends({
            key: this.state.coords.toString()
          }, PopupOptions, {
            maxHeight: 220,
            position: this.state.coords
          }),
          React.createElement(MarkerSelectPopupWithContext, {
            selectRow: this.selectRow,
            options: this.state.selectableTargets,
            context: this.context
          })
        );
      } else if (this.state.selectableTargets.length === 0) {
        popup = React.createElement(
          Popup,
          _extends({
            key: this.state.coords.toString()
          }, PopupOptions, {
            maxHeight: 220,
            position: this.state.coords
          }),
          React.createElement(LocationPopupWithContext, {
            name: '' // TODO: fill in name from reverse geocoding, possibly in a container.
            , lat: this.state.coords.lat,
            lon: this.state.coords.lng,
            context: this.context
          })
        );
      }
    }

    return popup;
  };

  return TileLayerContainer;
}(MapLayer);

TileLayerContainer.propTypes = {
  tileSize: PropTypes.number,
  zoomOffset: PropTypes.number,
  disableMapTracking: PropTypes.func
};
TileLayerContainer.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  map: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};


export default TileLayerContainer;