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
import cx from 'classnames';

import StopRoute from '../../../route/StopRoute';
import StopMarkerPopup from '../popups/StopMarkerPopup';
import GenericMarker from '../GenericMarker';
import Icon from '../../Icon';
import { getCaseRadius, getStopRadius, getHubRadius } from '../../../util/mapIconUtils';
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

var StopMarkerPopupWithContext = provideContext(StopMarkerPopup, {
  intl: intlShape.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
});

var StopMarker = function (_React$Component) {
  _inherits(StopMarker, _React$Component);

  function StopMarker() {
    var _temp, _this, _ret;

    _classCallCheck(this, StopMarker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.getModeIcon = function (zoom) {
      var iconId = 'icon-icon_' + _this.props.mode;
      var icon = Icon.asString(iconId, 'mode-icon');
      var size = void 0;
      if (zoom <= _this.context.config.stopsSmallMaxZoom) {
        size = _this.context.config.stopsIconSize.small;
      } else if (_this.props.selected) {
        size = _this.context.config.stopsIconSize.selected;
      } else {
        size = _this.context.config.stopsIconSize.default;
      }

      return L.divIcon({
        html: icon,
        iconSize: [size, size],
        className: cx('cursor-pointer', _this.props.mode, {
          small: size === _this.context.config.stopsIconSize.small,
          selected: _this.props.selected
        })
      });
    }, _this.getIcon = function (zoom) {
      var scale = _this.props.stop.transfer || _this.props.selected ? 1.5 : 1;
      var calcZoom = _this.props.stop.transfer || _this.props.selected ? Math.max(zoom, 15) : zoom;

      var radius = getCaseRadius({ $zoom: calcZoom }) * scale;
      var stopRadius = getStopRadius({ $zoom: calcZoom }) * scale;
      var hubRadius = getHubRadius({ $zoom: calcZoom }) * scale;

      var inner = (stopRadius + hubRadius) / 2;
      var stroke = stopRadius - hubRadius;

      // see app/util/mapIconUtils.js for the canvas version
      var iconSvg = '\n      <svg viewBox="0 0 ' + radius * 2 + ' ' + radius * 2 + '">\n        <circle class="stop-halo" cx="' + radius + '" cy="' + radius + '" r="' + radius + '"/>\n        <circle class="stop" cx="' + radius + '" cy="' + radius + '" r="' + inner + '" stroke-width="' + stroke + '"/>\n        ' + (inner > 7 && _this.props.stop.platformCode ? '<text x="' + radius + '" y="' + radius + '" text-anchor="middle" dominant-baseline="central"\n            fill="#333" font-size="' + 1.2 * inner + 'px"\n            font-family="Gotham XNarrow SSm A, Gotham XNarrow SSm B, Arial, sans-serif"\n            >' + _this.props.stop.platformCode + '</text>' : '') + '\n      </svg>\n    ';

      if (radius === 0) {
        iconSvg = '';
      }

      return L.divIcon({
        html: iconSvg,
        iconSize: [radius * 2, radius * 2],
        className: _this.props.mode + ' cursor-pointer'
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  StopMarker.prototype.render = function render() {
    var _this2 = this;

    if (!isBrowser) {
      return '';
    }

    return React.createElement(
      GenericMarker,
      {
        position: {
          lat: this.props.stop.lat,
          lon: this.props.stop.lon
        },
        getIcon: this.context.config.map.useModeIconsInNonTileLayer && !this.props.disableModeIcons ? this.getModeIcon : this.getIcon,
        id: this.props.stop.gtfsId,
        renderName: this.props.renderName,
        name: this.props.stop.name
      },
      React.createElement(Relay.RootContainer, {
        Component: StopMarkerPopup,
        route: new StopRoute({
          stopId: this.props.stop.gtfsId,
          date: this.context.getStore('TimeStore').getCurrentTime().format('YYYYMMDD'),
          currentTime: this.context.getStore('TimeStore').getCurrentTime().unix()
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

  return StopMarker;
}(React.Component);

StopMarker.propTypes = {
  stop: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  renderName: PropTypes.bool,
  disableModeIcons: PropTypes.bool,
  selected: PropTypes.bool
};
StopMarker.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  route: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired
};


export default StopMarker;