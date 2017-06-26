import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import provideContext from 'fluxible-addons-react/provideContext';
import { intlShape } from 'react-intl';
import { routerShape, locationShape } from 'react-router';

import CityBikePopup from '../popups/CityBikePopup';
import Icon from '../../Icon';
import GenericMarker from '../GenericMarker';
import { station as exampleStation } from '../../ExampleData';
import ComponentUsageExample from '../../ComponentUsageExample';
import CityBikeRoute from '../../../route/CityBikeRoute';
import { isBrowser } from '../../../util/browser';
import Loading from '../../Loading';

var L = void 0;

/* eslint-disable global-require */
// TODO When server side rendering is re-enabled,
//      these need to be loaded only when isBrowser is true.
//      Perhaps still using the require from webpack?
if (isBrowser) {
  L = require('leaflet');
}
/* eslint-enable global-require */

var CityBikePopupWithContext = provideContext(CityBikePopup, {
  intl: intlShape.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
});

// Small icon for zoom levels <= 15
var smallIconSvg = '\n  <svg viewBox="0 0 8 8">\n    <circle class="stop-small" cx="4" cy="4" r="3" stroke-width="1"/>\n  </svg>\n';

var CityBikeMarker = function (_React$Component) {
  _inherits(CityBikeMarker, _React$Component);

  function CityBikeMarker() {
    var _temp, _this, _ret;

    _classCallCheck(this, CityBikeMarker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.getIcon = function (zoom) {
      return !_this.props.transit && zoom <= _this.context.config.stopsSmallMaxZoom ? L.divIcon({
        html: smallIconSvg,
        iconSize: [8, 8],
        className: 'citybike cursor-pointer'
      }) : L.divIcon({
        html: Icon.asString('icon-icon_citybike', 'city-bike-medium-size'),
        iconSize: [20, 20],
        className: 'citybike cursor-pointer'
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CityBikeMarker.prototype.render = function render() {
    var _this2 = this;

    if (!isBrowser) return false;
    return React.createElement(
      GenericMarker,
      {
        position: {
          lat: this.props.station.lat,
          lon: this.props.station.lon
        },
        getIcon: this.getIcon,
        id: this.props.station.stationId
      },
      React.createElement(Relay.RootContainer, {
        Component: CityBikePopup,
        route: new CityBikeRoute({ stationId: this.props.station.stationId }),
        renderLoading: function renderLoading() {
          return React.createElement(
            'div',
            { className: 'card', style: { height: '12rem' } },
            React.createElement(Loading, null)
          );
        },
        renderFetched: function renderFetched(data) {
          return React.createElement(CityBikePopupWithContext, _extends({}, data, { context: _this2.context }));
        }
      })
    );
  };

  return CityBikeMarker;
}(React.Component);

CityBikeMarker.description = React.createElement(
  'div',
  null,
  React.createElement(
    'p',
    null,
    'Renders a citybike marker'
  ),
  React.createElement(
    ComponentUsageExample,
    { description: '' },
    React.createElement(CityBikeMarker, { key: exampleStation.id, map: 'leaflet map here', station: exampleStation })
  )
);
CityBikeMarker.displayName = 'CityBikeMarker';
CityBikeMarker.propTypes = {
  station: PropTypes.object.isRequired,
  transit: PropTypes.bool
};
CityBikeMarker.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  route: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired
};


export default Relay.createContainer(CityBikeMarker, {
  fragments: {
    station: function station() {
      return function () {
        return {
          children: [{
            fieldName: 'lat',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }, {
            fieldName: 'lon',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }, {
            fieldName: 'stationId',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'CityBikeMarker_StationRelayQL',
          type: 'BikeRentalStation'
        };
      }();
    }
  }
});