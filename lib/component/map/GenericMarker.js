import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';

import ComponentUsageExample from '../ComponentUsageExample';
import { isBrowser } from '../../util/browser';

var Marker = void 0;
var Popup = void 0;
var L = void 0;

/* eslint-disable global-require */
// TODO When server side rendering is re-enabled,
//      these need to be loaded only when isBrowser is true.
//      Perhaps still using the require from webpack?
if (isBrowser) {
  Marker = require('react-leaflet/lib/Marker').default;
  Popup = require('react-leaflet/lib/Popup').default;
  L = require('leaflet');
}
/* eslint-enable global-require */

var GenericMarker = function (_React$Component) {
  _inherits(GenericMarker, _React$Component);

  function GenericMarker() {
    var _temp, _this, _ret;

    _classCallCheck(this, GenericMarker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onMapMove = function () {
      return _this.forceUpdate();
    }, _this.getMarker = function () {
      return React.createElement(
        Marker,
        {
          position: { lat: _this.props.position.lat, lng: _this.props.position.lon },
          icon: _this.props.getIcon(_this.context.map.getZoom())
        },
        React.createElement(
          Popup,
          {
            offset: _this.context.config.map.genericMarker.popup.offset,
            closeButton: false,
            maxWidth: _this.context.config.map.genericMarker.popup.maxWidth,
            minWidth: _this.context.config.map.genericMarker.popup.minWidth,
            className: 'popup'
          },
          _this.props.children
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  GenericMarker.prototype.componentDidMount = function componentDidMount() {
    this.context.map.on('zoomend', this.onMapMove);
  };

  GenericMarker.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.id !== this.props.id;
  };

  GenericMarker.prototype.componentWillUnmount = function componentWillUnmount() {
    this.context.map.off('zoomend', this.onMapMove);
  };

  GenericMarker.prototype.getNameMarker = function getNameMarker() {
    if (!this.props.renderName || this.context.map.getZoom() < this.context.config.map.genericMarker.nameMarkerMinZoom) {
      return false;
    }

    return React.createElement(Marker, {
      key: this.props.name + '_text',
      position: { lat: this.props.position.lat, lng: this.props.position.lon },
      interactive: false,
      icon: L.divIcon({
        html: '<div>' + this.props.name + '</div>',
        className: 'popup',
        iconSize: [150, 0],
        iconAnchor: [-8, 7]
      })
    });
  };

  GenericMarker.prototype.render = function render() {
    if (!isBrowser) {
      return '';
    }

    return React.createElement(
      'div',
      null,
      this.getMarker(),
      this.getNameMarker()
    );
  };

  return GenericMarker;
}(React.Component);

GenericMarker.description = React.createElement(
  'div',
  null,
  React.createElement(
    'p',
    null,
    'A base class for markers.'
  ),
  React.createElement(
    ComponentUsageExample,
    { description: '' },
    React.createElement(GenericMarker, {
      position: { lat: 60.1626075196532, lon: 24.939603788199364 },
      mode: 'citybike',
      icons: { smallIconSvg: 'smallIcon in svg', iconSvg: 'icon in svg' },
      iconSizes: { smallIconSvg: [8, 8], iconSvg: [20, 20] },
      map: 'leaflet map object',
      id: 'marker id here'
    })
  )
);
GenericMarker.displayName = 'GenericMarker';
GenericMarker.contextTypes = {
  map: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};
GenericMarker.propTypes = {
  position: PropTypes.object.isRequired,
  getIcon: PropTypes.func.isRequired,
  id: PropTypes.string,
  renderName: PropTypes.bool,
  name: PropTypes.string,
  children: PropTypes.node
};
export default GenericMarker;