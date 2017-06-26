import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import { isBrowser } from '../../util/browser';

var Polyline = void 0;

/* eslint-disable global-require */
if (isBrowser) {
  Polyline = require('react-leaflet/lib/Polyline').default;
}
/* eslint-enable global-require */

var Line = function (_React$Component) {
  _inherits(Line, _React$Component);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Line.prototype.componentDidMount = function componentDidMount() {
    // If we accidently draw the thin line over a normal one,
    // the halo will block it completely and we only see the thin one.
    // So we send the thin line layers (Leaflet calls every polyline its
    // own layer) to bottom. Note that all polylines do render inside the
    // same SVG, so CSS z-index can't be used.
    if (this.props.thin) {
      this.line.leafletElement.bringToBack();
      this.halo.leafletElement.bringToBack();
    }
  };

  Line.prototype.componentDidUpdate = function componentDidUpdate() {
    if (!(this.props.passive && this.props.thin)) {
      this.line.leafletElement.bringToFront();
    }
  };

  // https://github.com/Leaflet/Leaflet/issues/2662
  // updating className does not work currently :(

  Line.prototype.render = function render() {
    var _this2 = this;

    var className = cx([this.props.mode, { thin: this.props.thin }]);

    var filteredPoints = void 0;
    if (this.props.geometry) {
      filteredPoints = this.props.geometry.filter(function (point) {
        return point.lat !== null && point.lon !== null;
      });
    }

    var lineConfig = this.context.config.map.line;
    var haloWeight = this.props.thin ? lineConfig.halo.thinWeight : lineConfig.halo.weight;
    var legWeight = this.props.thin ? lineConfig.leg.thinWeight : lineConfig.leg.weight;

    if (this.props.passive) {
      haloWeight *= 0.5;
      legWeight *= 0.5;
    }

    return React.createElement(
      'div',
      { style: { display: 'none' } },
      React.createElement(Polyline, {
        key: 'halo',
        ref: function ref(el) {
          _this2.halo = el;
        },
        positions: filteredPoints,
        className: 'leg-halo ' + className,
        weight: haloWeight,
        interactive: false
      }),
      React.createElement(Polyline, {
        key: 'line',
        ref: function ref(el) {
          _this2.line = el;
        },
        positions: filteredPoints,
        className: 'leg ' + className,
        color: this.props.passive ? '#758993' : 'currentColor',
        weight: legWeight,
        interactive: false
      })
    );
  };

  return Line;
}(React.Component);

Line.propTypes = {
  thin: PropTypes.bool,
  passive: PropTypes.bool,
  mode: PropTypes.string.isRequired,
  geometry: PropTypes.array.isRequired
};
Line.contextTypes = {
  config: PropTypes.object.isRequired
};
export default Line;