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

import { getDistanceToFurthestStop } from '../../../util/geo-utils';
import Icon from '../../Icon';
import StopMarkerPopup from '../popups/StopMarkerPopup';
import GenericMarker from '../GenericMarker';
import TerminalRoute from '../../../route/TerminalRoute';
import Loading from '../../Loading';

import { isBrowser } from '../../../util/browser';

var Circle = void 0;
var L = void 0;

/* eslint-disable global-require */
if (isBrowser) {
  Circle = require('react-leaflet/lib/Circle').default;
  L = require('leaflet');
}
/* eslint-enable global-require */

var StopMarkerPopupWithContext = provideContext(StopMarkerPopup, {
  intl: intlShape.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
});

var TerminalMarker = function (_React$Component) {
  _inherits(TerminalMarker, _React$Component);

  function TerminalMarker() {
    var _temp, _this, _ret;

    _classCallCheck(this, TerminalMarker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.getIcon = function () {
      return L.divIcon({
        html: Icon.asString('icon-icon_mapMarker-station', 'terminal-medium-size'),
        iconSize: [24, 24],
        className: _this.props.mode + ' cursor-pointer'
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TerminalMarker.prototype.getTerminalMarker = function getTerminalMarker() {
    var _this2 = this;

    return React.createElement(
      GenericMarker,
      {
        position: {
          lat: this.props.terminal.lat,
          lon: this.props.terminal.lon
        },
        getIcon: this.getIcon,
        id: this.props.terminal.gtfsId,
        renderName: this.props.renderName,
        name: this.props.terminal.name
      },
      React.createElement(Relay.RootContainer, {
        Component: StopMarkerPopup,
        route: new TerminalRoute({
          terminalId: this.props.terminal.gtfsId,
          date: this.context.getStore('TimeStore').getCurrentTime().format('YYYYMMDD')
        }),
        renderLoading: function renderLoading() {
          return React.createElement(
            'div',
            { className: 'card', style: { height: '12rem' } },
            React.createElement(Loading, null)
          );
        },
        renderFetched: function renderFetched(data) {
          return React.createElement(StopMarkerPopupWithContext, _extends({}, data, { context: _this2.context }));
        }
      })
    );
  };

  TerminalMarker.prototype.render = function render() {
    if (!isBrowser) {
      return '';
    }

    return React.createElement(
      'div',
      null,
      React.createElement(Circle, {
        center: { lat: this.props.terminal.lat, lng: this.props.terminal.lon },
        radius: getDistanceToFurthestStop(new L.LatLng(this.props.terminal.lat, this.props.terminal.lon), this.props.terminal.stops).distance,
        fillOpacity: 0.05,
        weight: 1,
        opacity: 0.3,
        className: this.props.mode,
        fillColor: 'currentColor',
        color: 'currentColor'
      }),
      this.getTerminalMarker()
    );
  };

  return TerminalMarker;
}(React.Component);

TerminalMarker.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  route: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired
};
TerminalMarker.propTypes = {
  terminal: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    gtfsId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stops: PropTypes.array
  }).isRequired,
  mode: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  renderName: PropTypes.string
};


export default TerminalMarker;