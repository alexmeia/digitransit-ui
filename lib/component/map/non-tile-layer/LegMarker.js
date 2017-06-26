import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { isBrowser } from '../../../util/browser';

/* eslint-disable global-require */

var Marker = isBrowser && require('react-leaflet/lib/Marker').default;
var L = isBrowser && require('leaflet');

/* eslint-enable global-require */

function fixName(name) {
  if (!name) return '';

  // minimum size can't be set because of flex bugs
  // so add whitespace to make the name wider

  if (name.length === 1) {
    return '\xA0' + name + '\xA0';
  } else if (name.length === 2) {
    return '\u202F' + name + '\u202F';
  }
  return name;
}

var LegMarker = function (_React$Component) {
  _inherits(LegMarker, _React$Component);

  function LegMarker() {
    var _temp, _this, _ret;

    _classCallCheck(this, LegMarker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.componentWillUnmount = function () {
      _this.context.map.off('zoomend', _this.onMapZoom);
    }, _this.onMapZoom = function () {
      _this.forceUpdate();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  LegMarker.prototype.componentDidMount = function componentDidMount() {
    this.context.map.on('zoomend', this.onMapZoom);
  };

  LegMarker.prototype.getLegMarker = function getLegMarker() {
    return React.createElement(Marker, {
      key: this.props.leg.name + '_text',
      position: {
        lat: this.props.leg.lat,
        lng: this.props.leg.lon
      },
      interactive: false,
      icon: L.divIcon({
        html: '<div>' + fixName(this.props.leg.name) + '</div>',
        className: 'legmarker ' + this.props.mode,
        iconSize: null
      })
    });
  };

  LegMarker.prototype.render = function render() {
    if (!isBrowser) {
      return '';
    }

    var p1 = this.context.map.latLngToLayerPoint(this.props.leg.from);
    var p2 = this.context.map.latLngToLayerPoint(this.props.leg.to);
    var distance = p1.distanceTo(p2);
    var minDistanceToShow = 64;

    return React.createElement(
      'div',
      null,
      distance >= minDistanceToShow && this.getLegMarker()
    );
  };

  return LegMarker;
}(React.Component);

LegMarker.contextTypes = {
  map: PropTypes.object.isRequired
};
LegMarker.propTypes = {
  leg: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};
export default LegMarker;